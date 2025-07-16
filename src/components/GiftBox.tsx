'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GiftBoxProps {
  size?: 'medium' | 'large';
  onClick?: () => void;
  isInteractive?: boolean;
  isOpened?: boolean;
}

// Bottom Layer Component - Square with ribbons
interface GiftBoxBottomProps {
  size: 'medium' | 'large';
}

function GiftBoxBottom({ size }: GiftBoxBottomProps) {
  const sizeClasses = {
    medium: 'w-24 h-24',
    large: 'w-40 h-40'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`} style={{ perspective: '1000px' }}>
      {/* Square Box Body - Purple with 3D effect */}
      <div
        className="w-full h-full rounded-lg relative"
        style={{
          background: 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 50%, #6A1B9A 100%)',
          boxShadow: `
            0 8px 16px rgba(106, 27, 154, 0.3),
            0 4px 8px rgba(138, 43, 226, 0.2),
            inset 0 2px 4px rgba(147, 112, 219, 0.3),
            inset 0 -2px 4px rgba(106, 27, 154, 0.2)
          `,
          transform: 'rotateX(5deg) rotateY(-5deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Vertical Ribbon - Golden with 3D effect */}
        <div
          className="absolute left-1/2 top-0 w-3 h-full transform -translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
            boxShadow: '2px 0 4px rgba(255, 215, 0, 0.4), -2px 0 4px rgba(255, 215, 0, 0.4)',
            borderRadius: '2px'
          }}
        ></div>
        {/* Horizontal Ribbon - Golden with 3D effect */}
        <div
          className="absolute top-1/2 left-0 w-full h-3 transform -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
            boxShadow: '0 2px 4px rgba(255, 215, 0, 0.4), 0 -2px 4px rgba(255, 215, 0, 0.4)',
            borderRadius: '2px'
          }}
        ></div>
        {/* 3D Edge highlights */}
        <div
          className="absolute top-0 left-0 w-full h-1 rounded-t-lg"
          style={{
            background: 'linear-gradient(90deg, rgba(147, 112, 219, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(147, 112, 219, 0.8) 100%)'
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(147, 112, 219, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(147, 112, 219, 0.8) 100%)'
          }}
        ></div>
      </div>
    </div>
  );
}

// Top Layer Component - Rectangle (slightly wider)
interface GiftBoxTopProps {
  size: 'medium' | 'large';
  isOpened: boolean;
}

function GiftBoxTop({ size, isOpened }: GiftBoxTopProps) {
  const sizeClasses = {
    medium: { width: 'w-28', height: 'h-8' }, // Slightly wider than bottom
    large: { width: 'w-44', height: 'h-12' }   // Slightly wider than bottom
  };

  return (
    <motion.div
      className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${sizeClasses[size].width} ${sizeClasses[size].height} rounded-lg`}
      animate={isOpened ? { y: -30 } : { y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        transformOrigin: 'bottom center',
        background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1B9A 50%, #4B0082 100%)',
        boxShadow: `
          0 6px 12px rgba(75, 0, 130, 0.4),
          0 3px 6px rgba(106, 27, 154, 0.3),
          inset 0 2px 4px rgba(138, 43, 226, 0.3),
          inset 0 -2px 4px rgba(75, 0, 130, 0.2)
        `,
        transform: 'rotateX(5deg) rotateY(-5deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Bow on top - Stitch Purple with 3D effect */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Bow Left */}
          <div
            className="absolute -left-3 w-4 h-3 rounded-full transform rotate-12"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '2px 2px 4px rgba(255, 215, 0, 0.4)'
            }}
          ></div>
          {/* Bow Right */}
          <div
            className="absolute -right-3 w-4 h-3 rounded-full transform -rotate-12"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '2px 2px 4px rgba(255, 215, 0, 0.4)'
            }}
          ></div>
          {/* Bow Center */}
          <div
            className="w-2 h-2 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '1px 1px 2px rgba(255, 215, 0, 0.4)'
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GiftBox({
  size = 'medium',
  onClick,
  isInteractive = false,
  isOpened = false
}: GiftBoxProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [isLocalOpened, setIsLocalOpened] = useState(false);

  // Auto shake animation for interactive gift boxes
  useEffect(() => {
    if (isInteractive && !isOpened && !isLocalOpened) {
      const interval = setInterval(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isInteractive, isOpened, isLocalOpened]);

  const sizeClasses = {
    medium: 'w-24 h-24',
    large: 'w-40 h-40'
  };

  const shakeAnimation = {
    x: isShaking ? [-2, 2, -2, 2, 0] : 0,
    transition: { duration: 0.5 }
  };

  // Hover shake animation
  const hoverAnimation = {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.4 }
  };

  const handleClick = () => {
    setIsLocalOpened(true);
    if (onClick) {
      // Delay the onClick callback to show the opening animation first
      setTimeout(() => {
        onClick();
      }, 300);
    }
  };

  // Continuous tilt and shake animation - more pronounced
  const continuousAnimation = {
    x: [-4, 4, -3, 3, -2, 2, 0],
    y: [-2, 2, -1.5, 1.5, -1, 1, 0],
    rotate: [-5, 5, -4, 4, -3, 3, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} cursor-pointer`}
      animate={isShaking ? shakeAnimation : continuousAnimation}
      whileHover={hoverAnimation}
      onClick={handleClick}
    >
      {/* Gift Box Container */}
      <div className="relative w-full h-full">
        {/* Bottom Layer - Square with ribbons */}
        <GiftBoxBottom size={size} />

        {/* Top Layer - Rectangle (slightly wider) */}
        <GiftBoxTop size={size} isOpened={isOpened} />

        {/* Sparkle Effects for Interactive Mode */}
        {isInteractive && (
          <>
            <motion.div
              className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="absolute -top-1 -right-3 w-1 h-1 bg-yellow-400 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-3 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 -right-2 w-1 h-1 bg-yellow-400 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
