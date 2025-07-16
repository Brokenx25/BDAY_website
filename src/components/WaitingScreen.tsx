'use client';

import { motion } from 'framer-motion';
import GiftBoxAnimationNew from './GiftBoxAnimationNew';

interface WaitingScreenProps {
  onGiftOpen: () => void;
}

export default function WaitingScreen({ onGiftOpen }: WaitingScreenProps) {
  const handleGiftClick = () => {
    // Delay the page transition to show the opening animation
    setTimeout(() => {
      onGiftOpen();
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: '#FFB6C1'
      }}
    >


      {/* Main Content */}
      <motion.div
        className="flex flex-col items-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(45deg, #FF69B4, #DDA0DD, #9370DB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            🎁 Your Special Gift Awaits! 🎁
          </h1>
          <p className="text-lg text-purple-600 font-medium">
            Click the magical gift box to reveal your surprise!
          </p>
        </motion.div>

        {/* Large Gift Box with Glow Effect */}
        <motion.div
          className="relative mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Magical Glow Effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-64 h-64 bg-gradient-radial from-purple-200/40 via-pink-200/30 to-transparent rounded-full blur-2xl"></div>
          </motion.div>

          {/* Gift Box - Interactive Animation */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GiftBoxAnimationNew
              onClick={handleGiftClick}
              isShaking={true}
            />
          </motion.div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-purple-600 font-medium text-lg flex items-center justify-center gap-2">
            ✨ Something magical is waiting inside ✨
          </p>
          <motion.p
            className="text-pink-500 font-semibold mt-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Tap to unwrap your surprise! 💝
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
