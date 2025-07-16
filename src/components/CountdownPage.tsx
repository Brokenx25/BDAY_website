'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StaticGiftBox from './StaticGiftBox';

interface CountdownPageProps {
  onComplete: () => void;
  backgroundGif?: string; // Optional GIF background
}

export default function CountdownPage({ onComplete, backgroundGif }: CountdownPageProps) {
  // Calculate time until July 18th, 2025 at 00:00:00 Singapore time
  const getTimeUntilJuly18 = () => {
    const now = new Date();
    const targetDate = new Date('2025-07-18T00:00:00+08:00'); // Singapore time (UTC+8)
    const difference = targetDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(difference / 1000)); // Convert to seconds
  };

  const [timeLeft, setTimeLeft] = useState(getTimeUntilJuly18());
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTimeLeft = getTimeUntilJuly18();
        setTimeLeft(newTimeLeft);
        if (newTimeLeft <= 0) {
          setTimerEnded(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // When timer ends, trigger the layout change
      setTimerEnded(true);
    }
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { days, hours, minutes, seconds: secs };
  };

  const time = formatTime(timeLeft);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: backgroundGif
          ? `url(${backgroundGif}) center/cover, linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Optional GIF Overlay */}
      {backgroundGif && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${backgroundGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Main Content Container */}
      <div className={`${timerEnded ? 'relative' : 'min-h-screen flex flex-col items-center justify-center'} relative z-10`}>

        {/* Title - only show during countdown */}
        {!timerEnded && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                color: '#F8F8FF',
                fontFamily: 'Frolicsome, cursive'
              }}
            >
              Countdown to something special ✨
            </h1>
          </motion.div>
        )}

        {/* Timer - moves higher above gift box and character, blinks slowly when ended */}
        <motion.div
          className={`${timerEnded ? 'fixed' : 'relative'} z-20`}
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: timerEnded ? [1, 0.2, 1] : 1,
            y: 0,
            x: timerEnded ? '-50%' : 0
          }}
          style={timerEnded ? {
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)'
          } : {}}
          transition={{
            duration: 0,
            opacity: timerEnded ? {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            } : {}
          }}
        >
          <div
            className={`flex flex-wrap gap-4 ${timerEnded ? 'mb-0' : 'mb-16'} justify-center`}
            style={{ fontFamily: 'Frolicsome, cursive' }}
          >
        {/* Hours - Split into two digits */}
        <div className="flex flex-col items-center">
          <div className="text-sm uppercase tracking-wider font-semibold mb-2" style={{ fontFamily: 'Frolicsome, cursive', color: 'snow' }}>
            HOURS
          </div>
          <div className="flex gap-2">
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'snow' }}>
                {String(time.hours).padStart(2, '0')[0]}
              </div>
            </motion.div>
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'white' }}>
                {String(time.hours).padStart(2, '0')[1]}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Minutes - Split into two digits */}
        <div className="flex flex-col items-center">
          <div className="text-sm uppercase tracking-wider font-semibold mb-2" style={{ fontFamily: 'Frolicsome, cursive', color: 'snow' }}>
            MINUTES
          </div>
          <div className="flex gap-2">
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'white' }}>
                {String(time.minutes).padStart(2, '0')[0]}
              </div>
            </motion.div>
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'white' }}>
                {String(time.minutes).padStart(2, '0')[1]}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Seconds - Split into two digits */}
        <div className="flex flex-col items-center">
          <div className="text-sm uppercase tracking-wider font-semibold mb-2" style={{ fontFamily: 'Frolicsome, cursive', color: 'snow' }}>
            SECONDS
          </div>
          <div className="flex gap-2">
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'white' }}>
                {String(time.seconds).padStart(2, '0')[0]}
              </div>
            </motion.div>
            <motion.div
              className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Frolicsome, cursive', color: 'white' }}>
                {String(time.seconds).padStart(2, '0')[1]}
              </div>
            </motion.div>
          </div>
        </div>




          </div>
        </motion.div>

        {/* Gift Box - Static during countdown, larger when timer ends */}
        <motion.div
          className={`${timerEnded ? 'flex flex-col items-center justify-center min-h-screen' : ''} relative z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: timerEnded ? 1.4 : 1,
            y: timerEnded ? -80 : 0
          }}
          transition={{ duration: 0 }}
        >
          {/* Stitch peeking over the gift box - only show when timer ends */}
          {timerEnded && (
            <motion.div
              className="relative z-20 mb-[-20px]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: [0, -2, 2, -1, 1, 0]
              }}
              transition={{
                duration: 0,
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }
              }}
            >
              <img
                src="/stitch-peek.svg"
                alt="Stitch peeking"
                className="w-32 h-24 object-contain"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              />
            </motion.div>
          )}

          <StaticGiftBox
            onClick={timerEnded ? onComplete : undefined}
            size={timerEnded ? 'large' : 'normal'}
            isShaking={timerEnded}
          />

          {/* Text under gift box when timer ends */}
          {timerEnded && (
            <motion.div
              className="mt-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.p
                className="font-semibold text-lg text-white"
                style={{
                  fontFamily: 'Frolicsome, cursive'
                }}
                animate={{
                  rotate: [0, 2, -2, 1, -1, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              >
                Open the box for a surprise
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
