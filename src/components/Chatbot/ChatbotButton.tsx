import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import ParticleEffect from './ParticleEffect';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatbotButton({ onClick, isOpen }: ChatbotButtonProps) {
  const glowAnimation = useSpring({
    from: { boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)' },
    to: { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
    loop: true,
    config: { duration: 1500 },
  });

  if (isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4">
      <ParticleEffect />
      <animated.div style={glowAnimation}>
        <motion.button
          onClick={onClick}
          className="relative p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-full border-2 border-indigo-400 border-opacity-20"
          />
          <MessageCircle size={24} />
        </motion.button>
      </animated.div>
    </div>
  );
}