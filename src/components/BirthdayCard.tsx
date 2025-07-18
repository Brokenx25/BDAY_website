'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface BirthdayCardProps {
  backgroundGif?: string; // Optional GIF background
}

export default function BirthdayCard({ backgroundGif }: BirthdayCardProps = {}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    // Set window dimensions
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle window resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Load audio file from public folder
    setAudioSrc('/happy-birthday-4-version-166418.mp3');

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      if (isPlaying) {
        // Auto-play with user interaction fallback
        const playAudio = async () => {
          try {
            await audioRef.current?.play();
          } catch {
            console.log('Auto-play blocked, user interaction required');
          }
        };
        playAudio();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioSrc, isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleConfetti = () => {
    setShowConfetti(!showConfetti);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: backgroundGif
          ? `url(${backgroundGif}) center/cover, linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Optional GIF Overlay */}
      {backgroundGif && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backgroundGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={150}
          recycle={true}
          gravity={0.2}
          colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#FFFFFF']}
        />
      )}

      {/* Control Buttons */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-2 z-50">
        <motion.button
          onClick={toggleMusic}
          className="p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm text-sm sm:text-base"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #667eea, #764ba2)'
              : 'linear-gradient(135deg, #f093fb, #f5576c)',
            color: 'white'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? '🔇' : '🎵'}
        </motion.button>

        <motion.button
          onClick={toggleConfetti}
          className="p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm text-sm sm:text-base"
          style={{
            background: showConfetti
              ? 'linear-gradient(135deg, #667eea, #764ba2)'
              : 'linear-gradient(135deg, #f093fb, #f5576c)',
            color: 'white'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showConfetti ? '🎊' : '✨'}
        </motion.button>
      </div>

      {/* Audio element for MP3 playback */}
      <audio ref={audioRef} preload="auto" style={{ display: 'none' }} />

      {/* Left Photo Spot - Stitch Birthday */}
      <motion.div
        className="fixed left-2 sm:left-4 lg:left-8 bottom-4 sm:top-1/2 transform sm:-translate-y-1/2 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          delay: 1.5,
          duration: 0.8
        }}
      >
        <div
          className="w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44 lg:w-56 lg:h-64 rounded-lg border-2 sm:border-4 border-dashed overflow-hidden"
          style={{
            borderColor: '#667eea',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <img
            src="/stitch-hbday.png"
            alt="Stitch Birthday"
            className="w-full h-full object-cover"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>
      </motion.div>

      {/* Right Photo Spot - Stitch Balloon */}
      <motion.div
        className="fixed right-2 sm:right-4 lg:right-8 bottom-4 sm:top-1/2 transform sm:-translate-y-1/2 z-30"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          delay: 1.7,
          duration: 0.8
        }}
      >
        <div
          className="w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44 lg:w-56 lg:h-64 rounded-lg border-2 sm:border-4 border-dashed overflow-hidden"
          style={{
            borderColor: '#764ba2',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <img
            src="/stitch-ballon.png"
            alt="Stitch Balloon"
            className="w-full h-full object-cover"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>
      </motion.div>

      {/* Birthday Card - Responsive size */}
      <motion.div
        className="rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-2 sm:mx-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8
        }}
      >
        {/* Spiral Flower Border Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Corner Spiral */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-lg sm:text-2xl" style={{ color: '#667eea' }}>🌸</div>
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-sm sm:text-lg" style={{ color: '#764ba2' }}>🌺</div>
              <div className="absolute top-2 left-0 sm:top-4 sm:left-1 text-xs sm:text-sm" style={{ color: '#f093fb' }}>🌼</div>
            </motion.div>
          </div>

          {/* Top Right Corner Spiral */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <motion.div
              className="relative"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-lg sm:text-2xl" style={{ color: '#764ba2' }}>🌹</div>
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-sm sm:text-lg" style={{ color: '#667eea' }}>🌸</div>
              <div className="absolute top-2 right-0 sm:top-4 sm:right-1 text-xs sm:text-sm" style={{ color: '#f093fb' }}>🌺</div>
            </motion.div>
          </div>

          {/* Bottom Left Corner Spiral */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-lg sm:text-2xl" style={{ color: '#f5576c' }}>🌻</div>
              <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-sm sm:text-lg" style={{ color: '#667eea' }}>🌼</div>
              <div className="absolute bottom-2 left-0 sm:bottom-4 sm:left-1 text-xs sm:text-sm" style={{ color: '#764ba2' }}>🌸</div>
            </motion.div>
          </div>

          {/* Bottom Right Corner Spiral */}
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
            <motion.div
              className="relative"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-lg sm:text-2xl" style={{ color: '#f093fb' }}>🌺</div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-sm sm:text-lg" style={{ color: '#f5576c' }}>🌹</div>
              <div className="absolute bottom-2 right-0 sm:bottom-4 sm:right-1 text-xs sm:text-sm" style={{ color: '#667eea' }}>🌻</div>
            </motion.div>
          </div>

          {/* Side Decorations */}
          <div className="absolute top-1/4 left-1 sm:left-2">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-lg sm:text-xl" style={{ color: '#667eea' }}>🌸</div>
            </motion.div>
          </div>

          <div className="absolute top-1/4 right-1 sm:right-2">
            <motion.div
              animate={{
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <div className="text-lg sm:text-xl" style={{ color: '#764ba2' }}>🌺</div>
            </motion.div>
          </div>

          <div className="absolute bottom-1/4 left-1 sm:left-2">
            <motion.div
              animate={{
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <div className="text-lg sm:text-xl" style={{ color: '#f093fb' }}>🌹</div>
            </motion.div>
          </div>

          <div className="absolute bottom-1/4 right-1 sm:right-2">
            <motion.div
              animate={{
                rotate: [0, -20, 20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 3 }}
            >
              <div className="text-lg sm:text-xl" style={{ color: '#f5576c' }}>🌼</div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Title - Made smaller */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Frolicsome, cursive'
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            HAPPY BIRTHDAY HUI MUN!
          </motion.h1>

          {/* Cake Illustration - Even lower to avoid overlap */}
          <motion.div
            className="flex justify-center mb-8 sm:mb-10 md:mb-12 mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              {/* Cake Base - Enhanced with more layers and decorations */}
              <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-22 lg:w-40 lg:h-24 rounded-lg relative" style={{
                background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                boxShadow: '0 8px 16px rgba(100, 116, 139, 0.3), inset 0 2px 4px rgba(248, 250, 252, 0.3)'
              }}>
                {/* Cake Layers - Multiple decorative layers */}
                <div className="absolute top-0 w-full h-3 rounded-t-lg" style={{
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                  boxShadow: '0 2px 4px rgba(102, 126, 234, 0.4)'
                }}></div>
                <div className="absolute top-1/3 w-full h-2 transform -translate-y-1/2" style={{
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                  boxShadow: '0 1px 2px rgba(102, 126, 234, 0.4)'
                }}></div>
                <div className="absolute top-2/3 w-full h-2 transform -translate-y-1/2" style={{
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                  boxShadow: '0 1px 2px rgba(102, 126, 234, 0.4)'
                }}></div>

                {/* Decorative dots on cake */}
                <div className="absolute top-1 left-2 sm:top-2 sm:left-4 w-1 h-1 sm:w-2 sm:h-2 rounded-full" style={{ background: '#f5576c' }}></div>
                <div className="absolute top-2 right-3 sm:top-4 sm:right-6 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: '#f093fb' }}></div>
                <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-6 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: '#667eea' }}></div>
                <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 w-1 h-1 sm:w-2 sm:h-2 rounded-full" style={{ background: '#764ba2' }}></div>

                {/* More Candles for 22nd Birthday */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 flex gap-0.5 sm:gap-1">
                  {/* Candle 1 */}
                  <div className="relative">
                    <div className="w-2 h-8 sm:w-3 sm:h-12 relative">
                      <div
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 50%, #667eea 100%)',
                          boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4), inset -1px 0 2px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-sm"
                          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-1 h-full rounded-l-sm"
                          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)' }}
                        ></div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-5 sm:-top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-5 sm:w-2 sm:h-7"
                      style={{
                        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 25%, #FF6B35 60%, #FF4500 100%)',
                        borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.4)'
                      }}
                      animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 0.9],
                        x: [0, 1, -1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Candle 2 */}
                  <div className="relative">
                    <div className="w-2 h-8 sm:w-3 sm:h-12 relative">
                      <div
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, #764ba2 0%, #667eea 50%, #f093fb 100%)',
                          boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4), inset -1px 0 2px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-sm"
                          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-1 h-full rounded-l-sm"
                          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)' }}
                        ></div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-5 sm:-top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-5 sm:w-2 sm:h-7"
                      style={{
                        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 25%, #FF6B35 60%, #FF4500 100%)',
                        borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.4)'
                      }}
                      animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 0.9],
                        x: [0, -1, 1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                      }}
                    />
                  </div>

                  {/* Candle 3 */}
                  <div className="relative">
                    <div className="w-2 h-8 sm:w-3 sm:h-12 relative">
                      <div
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, #f5576c 0%, #f093fb 50%, #764ba2 100%)',
                          boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4), inset -1px 0 2px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-sm"
                          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-1 h-full rounded-l-sm"
                          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)' }}
                        ></div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-5 sm:-top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-5 sm:w-2 sm:h-7"
                      style={{
                        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 25%, #FF6B35 60%, #FF4500 100%)',
                        borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.4)'
                      }}
                      animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 0.9],
                        x: [0, 1, -1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6
                      }}
                    />
                  </div>

                  {/* Candle 4 */}
                  <div className="relative">
                    <div className="w-2 h-8 sm:w-3 sm:h-12 relative">
                      <div
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f5576c 100%)',
                          boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4), inset -1px 0 2px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-sm"
                          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-1 h-full rounded-l-sm"
                          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)' }}
                        ></div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-5 sm:-top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-5 sm:w-2 sm:h-7"
                      style={{
                        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 25%, #FF6B35 60%, #FF4500 100%)',
                        borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.4)'
                      }}
                      animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 0.9],
                        x: [0, -1, 1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.9
                      }}
                    />
                  </div>

                  {/* Candle 5 */}
                  <div className="relative">
                    <div className="w-2 h-8 sm:w-3 sm:h-12 relative">
                      <div
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, #f093fb 0%, #667eea 50%, #f5576c 100%)',
                          boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4), inset -1px 0 2px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-sm"
                          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-1 h-full rounded-l-sm"
                          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)' }}
                        ></div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-5 sm:-top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-5 sm:w-2 sm:h-7"
                      style={{
                        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 25%, #FF6B35 60%, #FF4500 100%)',
                        borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.4)'
                      }}
                      animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.9, 1, 0.85, 0.9],
                        x: [0, 1, -1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Heartfelt Message */}
          <motion.div
            className="text-center mb-6 sm:mb-8 px-2 sm:px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <p
              className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Frolicsome, cursive'
              }}
            >
              Happy birthday to one of the brightest souls I know. 🎉 Today marks 23 years of your existence, and I just want to say how grateful I am that you&apos;re here, bringing light and joy into the lives of everyone around you.
            </p>
            <p
              className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed"
              style={{
                background: 'linear-gradient(45deg, #f093fb, #f5576c, #4facfe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0.9,
                fontFamily: 'Frolicsome, cursive'
              }}
            >
              You&apos;ve survived and thrived through every challenge – including the day when you drop your pen into that impossibly tiny gap and suddenly question your entire life&apos;s choices – always doing your best, and I admire you so deeply for that.
            </p>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0.9,
                fontFamily: 'Frolicsome, cursive'
              }}
            >
              May this year bring you the same kindness and happiness you give so effortlessly to others every day… and may you never drop your pen in that cursed gap again. �❤️
            </p>
          </motion.div>

          {/* Decorative Elements - Now with blinking */}
          <motion.div
            className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-2xl sm:text-3xl md:text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                opacity: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              🎈
            </motion.span>
            <motion.span
              animate={{
                rotate: [0, -10, 10, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
                opacity: {
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }
              }}
            >
              🎁
            </motion.span>
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
                opacity: {
                  duration: 1.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }
              }}
            >
              🎉
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
