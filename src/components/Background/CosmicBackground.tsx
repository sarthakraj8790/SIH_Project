import React from 'react';
import { motion } from 'framer-motion';
import StarField from './StarField';
import Planet from './Planet';
import CryptoIcon from './CryptoIcon';
import AuroraEffect from './AuroraEffect';

export default function CosmicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900" />
      
      {/* Star field */}
      <StarField />
      
      {/* Aurora effect */}
      <AuroraEffect />

      {/* Planets */}
      <Planet 
        size={120}
        position={{ x: 100, y: 100 }}
        color="#6366f1"
        glowColor="rgba(99, 102, 241, 0.3)"
        delay={0}
      />
      <Planet 
        size={80}
        position={{ x: window.innerWidth - 200, y: 200 }}
        color="#8b5cf6"
        glowColor="rgba(139, 92, 246, 0.3)"
        delay={0.3}
      />
      <Planet 
        size={160}
        position={{ x: window.innerWidth - 300, y: window.innerHeight - 200 }}
        color="#ec4899"
        glowColor="rgba(236, 72, 153, 0.3)"
        delay={0.6}
        isPulsating
      />

      {/* Crypto icons */}
      <CryptoIcon 
        type="bitcoin"
        position={{ x: '20%', y: '30%' }}
        delay={0}
      />
      <CryptoIcon 
        type="eth"
        position={{ x: '70%', y: '40%' }}
        delay={0.5}
      />
      <CryptoIcon 
        type="dollar"
        position={{ x: '40%', y: '60%' }}
        delay={1}
      />

      {/* Animated lines */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 8,
              delay: index * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{ top: `${(index + 1) * 25}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
}