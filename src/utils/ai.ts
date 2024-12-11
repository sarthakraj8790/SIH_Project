import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const systemPrompt = `You are an AI assistant for a cryptocurrency monitoring system. Your role is to:
- Help users analyze wallet addresses and transactions
- Explain blockchain concepts and security measures
- Provide guidance on detecting suspicious activities
- Assist with generating reports and understanding analytics
- Offer best practices for cryptocurrency security

Please provide clear, concise responses focused on cryptocurrency monitoring and security.`;

export async function getChatResponse(messages: { role: string; content: string }[]) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Format conversation history
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Start chat with system prompt
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'I understand my role and will assist with cryptocurrency monitoring and security.' }] },
        ...formattedMessages
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Generate response
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw error;
  }
}