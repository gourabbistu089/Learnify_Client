import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { FiArrowLeftCircle } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="bg-richblack-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6 max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto" />
        </motion.div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-edu-sa text-3xl mb-4"
        >
          Oops! Something Went Wrong
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-pure-greys-300 mb-6"
        >
          The page you're looking for isn't available or something went wrong. Please go back to the homepage or try again later.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg hover:shadow-xl transition-all"
          >
            <FiArrowLeftCircle className="mr-2 text-lg" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 60 }}
        className="absolute bottom-10 left-10 text-pure-greys-400"
      >
        CodeMaster © {new Date().getFullYear()}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
