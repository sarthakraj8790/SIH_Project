import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className = '' }: LogoProps) {
  return (
    <motion.div 
      className={`flex items-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="https://www.vhv.rs/dpng/d/495-4956236_national-emblem-of-india-png-transparent-png.png"
        alt="National Emblem of India"
        className="h-12 w-auto"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      {showText && (
        <motion.span 
          className="ml-2 text-white text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          CryptoGuard
        </motion.span>
      )}
    </motion.div>
  );
}