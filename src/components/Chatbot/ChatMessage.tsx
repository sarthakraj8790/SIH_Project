import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useSpring, animated } from '@react-spring/web';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: index * 200,
  });

  const glowAnimation = useSpring({
    from: { boxShadow: '0 0 5px rgba(99, 102, 241, 0.3)' },
    to: { boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)' },
    loop: true,
    config: { duration: 1500 },
  });

  return (
    <animated.div style={springProps}>
      <motion.div
        className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            isBot ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <motion.div
            className={`p-2 rounded-full ${
              isBot ? 'bg-indigo-600' : 'bg-green-600'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isBot ? (
              <Bot size={16} className="text-white" />
            ) : (
              <User size={16} className="text-white" />
            )}
          </motion.div>
          <animated.div
            style={isBot ? glowAnimation : undefined}
            className={`p-3 rounded-lg ${
              isBot
                ? 'bg-gray-700 text-white'
                : 'bg-indigo-600 text-white'
            }`}
          >
            <ReactMarkdown 
              className="prose prose-invert"
              components={{
                p: ({ children }) => <p className="text-sm">{children}</p>,
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 p-3 rounded-lg overflow-x-auto">
                    {children}
                  </pre>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            <div className="text-xs text-gray-400 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </animated.div>
        </div>
      </motion.div>
    </animated.div>
  );
}