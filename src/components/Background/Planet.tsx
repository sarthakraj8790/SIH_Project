import React from 'react';
import { motion } from 'framer-motion';

interface PlanetProps {
  size: number;
  position: { x: number; y: number };
  color: string;
  glowColor: string;
  delay?: number;
  isPulsating?: boolean;
}

export default function Planet({ 
  size, 
  position, 
  color, 
  glowColor, 
  delay = 0,
  isPulsating = false 
}: PlanetProps) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1,
        scale: isPulsating ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: isPulsating ? 4 : 1,
        delay,
        repeat: isPulsating ? Infinity : 0,
        repeatType: "reverse",
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.3 }
      }}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
    >
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}, ${glowColor})`,
          boxShadow: `0 0 40px ${glowColor}`,
        }}
      />
      <div 
        className="absolute inset-0 rounded-full opacity-50 blur-xl"
        style={{
          background: glowColor,
        }}
      />
    </motion.div>
  );
}