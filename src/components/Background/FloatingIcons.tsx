import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, DollarSign, Wallet } from 'lucide-react';

const icons = [
  { Icon: Bitcoin, color: 'text-yellow-400', position: { x: '20%', y: '20%' }, delay: 0 },
  { Icon: Wallet, color: 'text-purple-400', position: { x: '60%', y: '40%' }, delay: 0.5 },
  { Icon: DollarSign, color: 'text-green-400', position: { x: '80%', y: '60%' }, delay: 1 },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color}`}
          style={{
            left: position.x,
            top: position.y,
            filter: 'drop-shadow(0 0 10px currentColor)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon size={48} />
          <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full" />
        </motion.div>
      ))}
    </>
  );
}