import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  // Animation for the letters in "Learnify"
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const letters = "Learnify".split("");

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden" 
         style={{ background: "linear-gradient(135deg, #0f172a 0%, #131b2e 50%, #1e293b 100%)" }}>
      <div className="relative flex flex-col items-center z-10">
        {/* Animated orbital circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border opacity-20"
            style={{ 
              width: `${220 + i * 80}px`, 
              height: `${220 + i * 80}px`,
              borderColor: i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: {
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        ))}

        {/* Animated particles in background */}
        <div className="absolute inset-0 -z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 120 - 10}%`,
                top: `${Math.random() * 120 - 10}%`,
                opacity: 0.2 + Math.random() * 0.3,
                backgroundColor: 
                  i % 3 === 0 ? "#60a5fa" : 
                  i % 3 === 1 ? "#a78bfa" : "#2dd4bf"
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Glow effects */}
        <motion.div
          className="absolute rounded-full filter blur-3xl"
          style={{ 
            width: "180px", 
            height: "180px", 
            opacity: 0.13,
            background: "radial-gradient(circle, #3b82f6 0%, #8b5cf6 100%)"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.13, 0.18, 0.13]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-14 relative"
        >
          {/* Hexagon shape behind logo */}
          <motion.div
            className="absolute -inset-8"
            style={{
              opacity: 0.1,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            }}
            animate={{ 
              rotate: [0, 360],
              backgroundColor: ["#60a5fa", "#8b5cf6", "#60a5fa"]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              backgroundColor: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <div className="flex items-center">
            {/* Animated book icon */}
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mr-4"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5Z"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path
                  d="M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.path
                  d="M8 6H10M8 10H10M8 14H12"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
                <motion.path
                  d="M12 6H16M12 10H16"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </svg>
            </motion.div>

            {/* Animated text */}
            <div className="flex">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  className="text-5xl font-bold"
                  style={{ 
                    color: "#f0f9ff",
                    textShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated progress bar */}
        <div className="w-80 relative">
          {/* Top dots showing progress */}
          <div className="flex justify-between mb-2">
            {[0, 1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#60a5fa" }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  boxShadow: ["0 0 0px #60a5fa", "0 0 8px #60a5fa", "0 0 0px #60a5fa"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: step * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Main progress bar */}
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden" style={{ boxShadow: "0 0 5px rgba(15, 23, 42, 0.7)" }}>
            <motion.div
              className="h-full"
              style={{ 
                background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)"
              }}
              initial={{ width: "5%" }}
              animate={{ 
                width: "100%",
                background: [
                  "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                  "linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                  "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 50%, #3b82f6 100%)",
                  "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)"
                ]
              }}
              transition={{
                width: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                background: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </div>
        </div>

        {/* Status text */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Typewriter effect for messages */}
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
              ease: "easeInOut"
            }}
            className="h-6"
          >
            <motion.p
              className="text-sm font-medium tracking-wide"
              style={{ color: "#94a3b8" }}
            >
              Initializing learning environment...
            </motion.p>
          </motion.div>
          
          {/* Animated sparkles */}
          <div className="flex justify-center mt-4 space-x-3">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="relative"
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#06b6d4" }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#06b6d4",
                    opacity: 0.2 
                  }}
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.2, 0, 0.2]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;