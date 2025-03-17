import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaUsers, FaTrophy, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import about from '../../src/assets/aboutus/about.webp';
import img1 from '../assets/LMS_assets/assets/profile_img_1.png';
import img2 from '../assets/LMS_assets/assets/profile_img_2.png';
import img3 from '../assets/LMS_assets/assets/profile_img_3.png';
import HighlightText from "../components/core/Homepage/HighlightText";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,

    transition: { type: "spring", stiffness: 120 , duration:0.6 }
  }
};

const imageVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, duration:0.6 }
  }
};

const AboutUs = () => {
  return (
    <div className="font-inter text-richblack-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-gradient-to-r from-richblue-800 via-richblue-700 to-richblue-900 text-white py-24"
      >
        <div className="max-w-maxContent mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0 , x:50 }}
            animate={{ opacity: 1 , x:0 }}
            transition={{ delay: 0.2 , duration:0.5}}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to <HighlightText text = "Learnify"/>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x:-50 }}
            animate={{ opacity: 1 , x:0 }}
            transition={{ delay: 0.3 , duration:0.6}}
            className="text-lg md:text-xl mb-8"
          >
            Empowering Future Coders with Real-World Skills and Knowledge. <span className="text-[#12D8FA]">Let's fire on code</span>
          </motion.p>
          <motion.button 
            initial={{opacity:0.4 , y:50}}
            animate={{opacity:1 , y:0}}
            transition={{duration:0.6,delay:0.3}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-caribbeangreen-200 hover:bg-caribbeangreen-300 text-richblue-900 px-8 py-3 rounded-full text-lg font-semibold"
          >
            Get Started Today
          </motion.button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-richblue-900"></div>
      </motion.section>

      {/* Founding Story */}
      <section className="py-16 bg-richblack-800">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="max-w-maxContent mx-auto grid md:grid-cols-2 gap-8 items-center px-4"
        >
          <motion.div variants={itemVariants} className="px-4">
            <h2 className="text-3xl font-bold mb-4 text-caribbeangreen-200">
              Our Founding Story
            </h2>
            <p className="text-richblack-300 leading-relaxed">
              Learnify was born from a vision to make quality coding
              education accessible to every aspiring coder. Our founders, driven
              by a passion for technology and teaching, created a platform that
              bridges the gap between theory and practice. Today, we’re a
              community of learners, instructors, and industry leaders
              revolutionizing tech education globally.
            </p>
          </motion.div>
          <motion.img
            variants={imageVariants}
            src={about}
            alt="Founding Story"
            className="rounded-lg shadow-xl max-w-full h-auto"
            viewport={{ once: true }}
          />
        </motion.div>
      </section>

      {/* Vision, Mission, Stats */}
      <section className="bg-richblue-900 py-16 text-center text-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-maxContent mx-auto grid md:grid-cols-3 gap-12 px-4"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="p-8 bg-richblue-800 rounded-xl hover:shadow-xl transition-all"
          >
            <BiCodeAlt className="text-5xl text-caribbeangreen-200 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-richblue-200">
              To inspire and educate millions of aspiring coders worldwide,
              fostering innovation and creativity in the tech industry.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="p-8 bg-richblue-800 rounded-xl hover:shadow-xl transition-all"
          >
            <FaTrophy className="text-5xl text-caribbeangreen-200 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-richblue-200">
              Deliver accessible, top-tier tech education and build a community
              that thrives on learning and growth.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="p-8 bg-richblue-800 rounded-xl hover:shadow-xl transition-all"
          >
            <FaUsers className="text-5xl text-caribbeangreen-200 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Impact</h3>
            <p className="text-richblue-200">
              50,000+ students trained, 1,000+ hours of content, and growing
              every day.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-richblack-800">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-maxContent mx-auto text-center px-4"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-bold mb-6 text-caribbeangreen-200"
          >
            Meet the Team
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[img1, img2, img3].map((img, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-all"
              >
                <motion.img
                  src={img}
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-caribbeangreen-200"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h4 className="text-xl font-semibold">
                  {["John Doe", "Jane Smith", "Alex Johnson"][index]}
                </h4>
                <p className="text-richblack-300">
                  {["Co-Founder & CEO", "CTO", "Lead Instructor"][index]}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-richblue-900 py-10 text-center"
      >
        <div className="max-w-maxContent mx-auto">
          <h5 className="text-xl font-semibold text-caribbeangreen-200 mb-4">
            Stay Connected
          </h5>
          <motion.div 
            className="flex justify-center gap-6 text-white text-2xl mb-6"
            variants={containerVariants}
          >
            {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer hover:text-caribbeangreen-200 transition-colors"
              >
                <Icon />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-richblue-200">
            © {new Date().getFullYear()} Coding Master. All Rights Reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default AboutUs;