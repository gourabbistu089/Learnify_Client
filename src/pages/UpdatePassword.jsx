import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/apiCalls/authCall';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";

function UpdatePassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.pathname.split("/").pop();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formData, "token", token);
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate));
    };

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121212] to-[#1E1E1E] p-4">
            {loading ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-white"
                >
                    <div className="w-12 h-12 border-4 border-t-[#6366F1] border-r-[#6366F1] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-xl font-medium">Loading...</p>
                </motion.div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8">
                        <motion.div variants={itemVariants} className="mb-8">
                            <h1 className="text-2xl font-bold text-white mb-2">Choose New Password</h1>
                            <p className="text-[#A0AEC0]">Almost done, just enter your new password below</p>
                        </motion.div>

                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <p className="text-[#E2E8F0] font-medium mb-2">
                                        New Password <span className="text-[#F56565]">*</span>
                                    </p>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            className="w-full px-4 py-3 bg-[#2D3748] text-white rounded-lg border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition duration-200"
                                            placeholder="Enter your new password"
                                            value={formData.password}
                                            onChange={handleOnChange}
                                        />
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#A0AEC0] hover:text-white transition duration-200">
                                            {showPassword ? (
                                                <IoEyeOffOutline 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    size={20}
                                                />
                                            ) : (
                                                <IoEyeOutline 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    size={20}
                                                />
                                            )}
                                        </span>
                                    </div>
                                </label>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <p className="text-[#E2E8F0] font-medium mb-2">
                                        Confirm Password <span className="text-[#F56565]">*</span>
                                    </p>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            required
                                            placeholder="Confirm your new password"
                                            value={formData.confirmPassword}
                                            className="w-full px-4 py-3 bg-[#2D3748] text-white rounded-lg border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition duration-200"
                                            onChange={handleOnChange}
                                        />
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#A0AEC0] hover:text-white transition duration-200">
                                            {showConfirmPassword ? (
                                                <IoEyeOffOutline 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    size={20}
                                                />
                                            ) : (
                                                <IoEyeOutline 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    size={20}
                                                />
                                            )}
                                        </span>
                                    </div>
                                </label>
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300"
                            >
                                Update Password
                            </motion.button>
                        </form>

                        <motion.div 
                            variants={itemVariants}
                            className="mt-8 flex items-center justify-center"
                        >
                            <Link to="/login" className="flex items-center text-[#6366F1] hover:text-[#8B5CF6] transition duration-300">
                                <FiArrowLeft className="mr-2" />
                                <p>Back to Login</p>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default UpdatePassword;