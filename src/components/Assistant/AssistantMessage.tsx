import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssistantMessageProps {
  content: string;
}

export default function AssistantMessage({ content }: AssistantMessageProps) {
  return (
    <div className="flex space-x-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <Bot size={16} className="text-white" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-gray-700 rounded-lg p-3"
      >
        <p className="text-white text-sm whitespace-pre-wrap">{content}</p>
      </motion.div>
    </div>
  );
}