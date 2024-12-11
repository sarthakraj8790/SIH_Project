import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, DollarSign, Coins } from 'lucide-react';

interface CryptoIconProps {
  type: 'bitcoin' | 'eth' | 'dollar';
  size?: number;
  position: { x: number | string; y: number | string };
  delay?: number;
  orbit?: boolean;
}

const iconMap = {
  bitcoin: Bitcoin,
  eth: Coins, // Using Coins icon instead of Ethereum since it's not available
  dollar: DollarSign,
};

const colorMap = {
  bitcoin: 'text-yellow-400',
  eth: 'text-purple-400',
  dollar: 'text-green-400',
};

export default function CryptoIcon({ type, size = 48, position, delay = 0, orbit = true }: CryptoIconProps) {
  const Icon = iconMap[type];
  const color = colorMap[type];

  return (
    <motion.div
      className={`absolute ${color}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
        scale: 1,
        ...(orbit && {
          x: [0, 50, 0],
          y: [0, -50, 0],
        })
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      whileHover={{ 
        scale: 1.2,
        transition: { duration: 0.3 }
      }}
      style={{
        left: position.x,
        top: position.y,
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
    >
      <Icon size={size} />
      <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full" />
    </motion.div>
  );
}