import React, { createContext, useContext, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { getChatResponse } from '../../utils/ai';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      type: 'bot',
      content: "Hello! I'm your AI assistant for cryptocurrency monitoring. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = {
        id: nanoid(),
        type: 'user',
        content: content.trim(),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Prepare conversation history
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      conversationHistory.push({ role: 'user', content: content.trim() });

      // Get AI response with retry mechanism
      let retries = 3;
      let aiResponse = null;
      
      while (retries > 0 && !aiResponse) {
        try {
          aiResponse = await getChatResponse(conversationHistory);
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        }
      }

      // Add bot message
      const botMessage: Message = {
        id: nanoid(),
        type: 'bot',
        content: aiResponse || 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response. Please try again.');
      
      // Add error message
      const errorMessage: Message = {
        id: nanoid(),
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: nanoid(),
      type: 'bot',
      content: "Hello! I'm your AI assistant for cryptocurrency monitoring. How can I help you today?",
      timestamp: new Date()
    }]);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}