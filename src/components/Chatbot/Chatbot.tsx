import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '../../utils/cn';
import ChatMessage from './ChatMessage';
import QuickReply from './QuickReply';
import { useChat } from './ChatContext';
import { toast } from 'react-hot-toast';

const quickReplies = [
  'How to analyze a wallet?',
  'Check transaction risk',
  'Detect suspicious activity',
  'Generate report',
];

export default function Chatbot() {
  const { messages, sendMessage, isLoading } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatWindowSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 20 },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    try {
      const message = inputMessage;
      setInputMessage('');
      await sendMessage(message);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}

        {isOpen && (
          <animated.div
            style={chatWindowSpring}
            className={cn(
              "w-96 bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden border border-indigo-500/20",
              isMinimized ? "h-14" : "h-[600px]"
            )}
          >
            <motion.div
              className="relative flex items-center justify-between p-4 bg-indigo-600/90 backdrop-blur-sm"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>

            {!isMinimized && (
              <>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
                  {messages.map((msg, index) => (
                    <ChatMessage key={msg.id} message={msg} index={index} />
                  ))}
                  {isLoading && (
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-gray-750 border-t border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quickReplies.map((reply) => (
                      <QuickReply
                        key={reply}
                        text={reply}
                        onClick={() => {
                          setInputMessage(reply);
                          handleSend();
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={1}
                      disabled={isLoading}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={isLoading}
                      className={cn(
                        "p-2 text-white rounded-lg transition-colors",
                        isLoading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      )}
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </animated.div>
        )}
      </AnimatePresence>
    </div>
  );
}