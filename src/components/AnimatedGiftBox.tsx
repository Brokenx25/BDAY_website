'use client';

import { motion } from 'framer-motion';

interface AnimatedGiftBoxProps {
  onClick?: () => void;
  isShaking?: boolean;
  isOpen?: boolean; // New prop to control if box is open or closed
}

export default function AnimatedGiftBox({ onClick, isShaking = false, isOpen = false }: AnimatedGiftBoxProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  // Shaking animation
  const shakeAnimation = {
    x: isShaking ? [-3, 3, -3, 3, 0] : 0,
    y: isShaking ? [-2, 2, -2, 2, 0] : 0,
    transition: { duration: 0.5, repeat: isShaking ? Infinity : 0, repeatDelay: 2 }
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {/* Gift Box Container */}
      <motion.div
        className="relative w-48 h-32"
        animate={shakeAnimation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Bottom Part (always visible) */}
        <motion.img
          src="/gift-box-bottom.svg"
          alt="Gift Box Bottom"
          className="absolute bottom-0 left-0 w-full h-auto"
          style={{ zIndex: 1 }}
        />

        {/* Top Part - moves up when open */}
        <motion.img
          src="/gift-box-top.svg"
          alt="Gift Box Top"
          className="absolute top-0 left-0 w-full h-auto"
          style={{
            zIndex: 2,
            transformOrigin: 'center bottom'
          }}
          animate={isOpen ? {
            y: -40, // Move up when open
            scale: 1.05
          } : {
            y: 0 // Normal position when closed
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        />

        {/* Sparkle effects when open */}
        {isOpen && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-xl"
                style={{
                  left: `${40 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 40}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -40],
                  x: [0, (Math.random() - 0.5) * 80],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Click instruction */}
      {isShaking && !isOpen && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-purple-600 font-semibold text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Click to open! 🎁
        </motion.div>
      )}
    </div>
  );
}
