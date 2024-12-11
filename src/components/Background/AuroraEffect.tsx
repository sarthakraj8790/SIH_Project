import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        background: [
          'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, rgba(45, 212, 191, 0.1) 25%, rgba(139, 92, 246, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
          'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.1) 25%, rgba(45, 212, 191, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
          'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.2) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(99, 102, 241, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
        ]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}