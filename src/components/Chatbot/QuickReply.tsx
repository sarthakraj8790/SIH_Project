import React from 'react';
import { motion } from 'framer-motion';

interface QuickReplyProps {
  text: string;
  onClick: () => void;
}

export default function QuickReply({ text, onClick }: QuickReplyProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full hover:bg-gray-600 transition-colors"
    >
      {text}
    </motion.button>
  );
}