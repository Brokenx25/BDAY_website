'use client';

import { motion } from 'framer-motion';

interface StaticGiftBoxProps {
  onClick?: () => void;
  size?: 'normal' | 'large';
  isShaking?: boolean;
}

export default function StaticGiftBox({ onClick, size = 'normal', isShaking = false }: StaticGiftBoxProps) {
  const sizeClass = size === 'large' ? 'w-44 h-auto' : 'w-32 h-auto';

  const shakeAnimation = isShaking ? {
    rotate: [0, 2, -2, 1, -1, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1
    }
  } : {};

  return (
    <motion.div 
      className="relative cursor-pointer"
      onClick={onClick}
      animate={shakeAnimation}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gift Box Bottom */}
      <img 
        src="/gift-box-bottom.svg" 
        alt="Gift Box Bottom" 
        className={`${sizeClass}`}
        style={{ zIndex: 1 }}
      />
      
      {/* Gift Box Top */}
      <img 
        src="/gift-box-top.svg" 
        alt="Gift Box Top" 
        className={`absolute top-0 left-0 ${sizeClass}`}
        style={{ 
          zIndex: 2,
          transform: 'translateY(-20px)'
        }}
      />
    </motion.div>
  );
}
