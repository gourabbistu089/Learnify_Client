import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div className="w-screen  bg-richblack-900 flex font-inter relative min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center"><ProfileLoader /></div>;
  }

  return (
    <div className="w-screen text-white bg-richblack-900 flex font-inter relative min-h-[calc(100vh-3.5rem)] ">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] overflow-auto flex-grow">
        <div className="ml-[3.0rem] md:ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


function ProfileLoader() {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 200);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Ripple animation variants
  const rippleVariants = {
    animate: (i) => ({
      scale: [1, 1.8],
      opacity: [0.6, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.4,
        ease: "easeOut"
      }
    })
  };
  
  // User icon pulse animation
  const iconVariants = {
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      <div className="relative">
        {/* Profile circle container */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden">
          {/* Background gradient animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tl from-[#8b5cf6] to-[#f472b6] opacity-30"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          
          {/* Blurred overlay for depth */}
          <div className="absolute inset-0 bg-[#0c0122] opacity-30" />
          
          {/* User icon */}
          <motion.div
            className="relative z-10"
            variants={iconVariants}
            animate="animate"
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                clipRule="evenodd" 
              />
            </svg>
          </motion.div>
          
          {/* Ripple effects */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={rippleVariants}
              initial={{ scale: 1, opacity: 0.6 }}
              animate="animate"
              className="absolute inset-0 rounded-full border-2 border-white border-opacity-50"
            />
          ))}
        </div>
        
        {/* Rotating loading indicator */}
        <motion.div 
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="8"
              strokeDasharray="70 180"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Progress text */}
      <div className="text-indigo-100 bg-indigo-900 bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium">
        {progress < 100 ? 'Loading profile...' : 'Ready!'}
      </div>
    </div>
  );
}