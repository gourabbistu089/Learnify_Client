import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaPlay,
  FaStar,
  FaUsers,
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";
import HighlightText from "../../components/core/Homepage/HighlightText";
import { useNavigate } from "react-router-dom";


// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-6, 6, -6] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);


const HeroSection = ({user}) => {
     const navigate = useNavigate();
  const [userData, setUserData] = useState(user);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6703d2]/30 to-[#4ECDC4]/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#45B7D1]/20 to-[#7c01b9]/30 rounded-full blur-2xl"
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(78, 205, 196, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78, 205, 196, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#cf1717] to-[#08aba0] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
  

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-3.5 md:px-6 pt-10 md:pt-16">
        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => {navigate("/dashboard/enrolled-courses")}}
          className="group mx-auto rounded-full bg-[#16213E]/80 backdrop-blur-sm font-bold text-[#B8BCC8] transition-all duration-300 hover:scale-105 w-fit shadow-2xl shadow-[#4ECDC4]/10 border border-[#4ECDC4]/20 hover:border-[#4ECDC4]/40 cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3 rounded-full py-3 px-4  md:px-6  group-hover:bg-gradient-to-r group-hover:from-[#FF6B6B]/10 group-hover:to-[#4ECDC4]/10 transition-all duration-300">
            <p className="text-sm font-semibold">
              {userData ? "🎯 Continue Learning" : "🎯 Get Started Today"}
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaArrowRight className="text-[#4ECDC4] group-hover:block hidden" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center font-bold text-5xl lg:text-7xl md:mt-12 mt-5 leading-tight"
        >
          <div className="text-white mb-4">Transform Your Future with</div>
          <HighlightText text="Learnify" />
        </motion.div>
        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-[70%] text-center mt-8 md:text-xl text-lg text-[#B8BCC8] font-medium leading-relaxed"
        >
          Unlock your potential with our cutting-edge learning platform. Master
          new skills, advance your career, and join thousands of successful
          learners who've transformed their lives through quality education.
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 mt-8 flex-wrap justify-center"
        >
          {[
            "🎓 Expert Instructors",
            "💎 Premium Content",
            "🏆 Certified Courses",
            "📱 Mobile Learning",
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-[#B8BCC8] text-sm border border-white/10 hover:border-[#4ECDC4]/30 transition-all duration-300 cursor-pointer"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex md:gap-20 md:mt-20  gap-5 mt-10 flex-wrap md:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold md:py-4 md:px-8 px-4 py-4 rounded-full shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3"
          >
            <FaPlay className="text-sm" />
            Start Learning Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-4 md:px-8 rounded-full border border-white/20 hover:border-[#4ECDC4]/40 hover:bg-white/15 transition-all duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-[14%] left-1/4 hidden lg:block">
          <FloatingElement delay={0} duration={5}>
            <div className="bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <FaBookOpen className="text-[#4ECDC4] text-2xl" />
            </div>
          </FloatingElement>
        </div>

        <div className="absolute top-1/3 right-1/4 hidden lg:block">
          <FloatingElement delay={1} duration={4}>
            <div className="bg-gradient-to-r from-[#45B7D1]/20 to-[#96CEB4]/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <FaGraduationCap className="text-[#45B7D1] text-2xl" />
            </div>
          </FloatingElement>
        </div>

        <div className="absolute bottom-[20%] left-1/4 hidden lg:block">
          <FloatingElement delay={2} duration={6}>
            <div className="bg-gradient-to-r from-[#96CEB4]/20 to-[#FF6B6B]/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <FaStar className="text-[#96CEB4] text-2xl" />
            </div>
          </FloatingElement>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#11111b] to-transparent" />
    </div>
  );
};

export default HeroSection;
