import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { sentMessage } from '../services/apiCalls/profileCall';

const ContactUs = () => {
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile:"",
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants1 = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0 },
  };
  const itemVariants2 = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 , y:25 },
    visible: { opacity: 1 , y:0 },
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message,mobile } = formData;
    console.log("Form Data:", formData);
    setLoading(true);
    sentMessage({name,email,message,mobile});
    setLoading(false);
    setFormData({name: "", email: "", message: "",mobile:""});
  };

  return (
    <div className="bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 , delay:0.3}}
        className="bg-gradient-to-br from-richblack-800 to-richblack-900 text-white py-20 px-8 text-center shadow-xl"
      >
        <motion.h1 variants={fadeInUp} 
         transition={{ duration: 0.8 , delay:0.6}}
        className="text-5xl md:text-6xl font-extrabold mb-4">
          Get in Touch
        </motion.h1>
        <motion.p variants={fadeInUp} 
        transition={{ duration: 0.8 , delay:0.7}}
        className="text-lg md:text-xl max-w-3xl mx-auto">
          Have questions or want to get in touch with us? We’d love to hear from you. Use the contact info below or fill out the form.
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto py-20 md:px-8 px-6 flex md:flex-row flex-col-reverse justify-evenly gap-12"
      >
        {/* Contact Information */}
        <motion.div variants={itemVariants1}
        transition={{ duration: 0.8 , delay:0.8}}
        className="space-y-12 relative bg-gradient-to-r from-richblue-600/25 px-6 to-richblue-700/15">
          <div className=""></div>
          <h2 className="text-3xl font-extrabold text-richblack-5">Contact Information</h2>
          <div className="space-y-10">
            {[
              { icon: <FaPhoneAlt />, title: 'Call Us', details: '+1 987 654 321' },
              { icon: <FaEnvelope />, title: 'Email Us', details: 'support@domain.com' },
              { icon: <FaMapMarkerAlt />, title: 'Visit Us', details: '123 Main Street, Cityville' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants1}
                className="flex items-center space-x-4 hover:bg-richblack-800 p-6 rounded-lg transition"
              >
                <div className="p-4 bg-teal-400 text-blue-400 rounded-full text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p>{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants2}
        transition={{ duration: 0.8 , delay:0.8}}
        className="col-span-2">
          <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 text-richblack-5 shadow-xl rounded-lg md:p-8 p-4">
            <h2 className="text-4xl font-bold text-center mb-8 text-blue-400">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 border border-richblack-700 bg-richblack-900 text-richblack-5 placeholder-richblack-25 focus:ring-2 focus:ring-teal-400 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 border border-richblack-700 bg-richblack-900 text-richblack-5 placeholder-richblack-25 focus:ring-2 focus:ring-teal-400 rounded-md"
                />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile No."
                className="w-full p-4 border border-richblack-700 bg-richblack-900 text-richblack-5 placeholder-richblack-25 focus:ring-2 focus:ring-teal-400 rounded-md"
              />
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-4 border border-richblack-700 bg-richblack-900 text-richblack-5 placeholder-richblack-25 focus:ring-2 focus:ring-teal-400 rounded-md"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-teal-400 text-richblack-5 font-semibold bg-blue-200 rounded-md shadow-lg hover:bg-blue-300 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-richblue-900 py-10 text-center"
      >
        <div className="max-w-maxContent mx-auto">
          <h5 className="text-xl font-semibold text-richblue-200 mb-4">Stay Connected</h5>
          <div className="flex justify-center gap-6 text-white text-2xl mb-6">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
          </div>
          <p className="text-richblue-200">
            © {new Date().getFullYear()} Coding Master. All Rights Reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ContactUs;