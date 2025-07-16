'use client';

import React, { useReducer } from "react";
import { motion } from "framer-motion";

const init_state = {
  move: "move",
  rotating: "",
  rotated: "",
  showConfetti: false
};

interface GiftBoxAnimationProps {
  onClick?: () => void;
  isShaking?: boolean;
}

export default function GiftBoxAnimationNew({ onClick, isShaking = false }: GiftBoxAnimationProps) {
  const [state, setState] = useReducer(
    (state: any, new_state: any) => ({
      ...state,
      ...new_state
    }),
    init_state
  );

  const { move, rotating, rotated, showConfetti } = state;

  function animate() {
    let isDone = rotated === "rotated" ? true : false;

    if (!isDone) {
      setState({ rotating: "rotating" });
      setTimeout(() => {
        setState({ showConfetti: true });
      }, 300);
      setTimeout(() => {
        setState({ rotated: "rotated" });
      }, 1000);
      setTimeout(() => {
        if (onClick) onClick();
      }, 1500);
    } else {
      setState(init_state);
    }
    let moving = move === "move" ? "" : "move";
    setState({ move: moving });
  }

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${50 + Math.random() * 20 - 10}%`,
                top: `${50 + Math.random() * 20 - 10}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
              }}
            >
              {i % 4 === 0 ? '🎉' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🎊' : '💫'}
            </motion.div>
          ))}
        </div>
      )}

      {/* Gift Box Container */}
      <div className="relative">
        {/* Box Bottom */}
        <button 
          className="relative bg-transparent border-0 cursor-pointer outline-none"
          onClick={animate}
        >
          <img 
            src="/gift-box-bottom.svg" 
            alt="Gift Box" 
            className="w-48 h-auto"
          />
        </button>

        {/* Box Lid */}
        <img
          src="/gift-box-top.svg"
          alt="Gift Box Lid"
          className={`absolute w-48 h-auto transition-all duration-1000 ${
            move && !rotated ? 'animate-wiggle' : ''
          } ${
            rotating ? 'animate-rotating' : ''
          } ${
            rotated ? 'lid-rotated' : 'lid-normal'
          }`}
          style={{
            left: '0',
            top: '-20px',
            transformOrigin: 'bottom left'
          }}
        />
      </div>

      {/* Click instruction */}
      {isShaking && !rotated && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-purple-600 font-semibold text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Click to open! 🎁
        </motion.div>
      )}

      <style jsx>{`
        .animate-wiggle {
          animation: wiggle 1s infinite linear;
        }

        .animate-rotating {
          animation: rotating 1s ease-out;
        }

        .lid-normal {
          transform: translate(0, 0) rotate(0deg);
        }

        .lid-rotated {
          transform: rotate(145deg) translate(-70%, -170px);
        }

        @keyframes wiggle {
          10%, 90% {
            transform: translate(0, 0) translate3d(-2px, 0, 0);
          }
          20%, 80% {
            transform: translate(0, 0) translate3d(4px, 0, 0);
          }
          30%, 50%, 70% {
            transform: translate(0, 0) translate3d(-6px, 0, 0);
          }
          40%, 60% {
            transform: translate(0, 0) translate3d(6px, 0, 0);
          }
        }

        @keyframes rotating {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: rotate(145deg) translate(-70%, -170px);
          }
        }
      `}</style>
    </div>
  );
}
