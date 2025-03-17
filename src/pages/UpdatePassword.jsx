import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/apiCalls/authCall';
import { RiLockPasswordLine, RiLockPasswordFill, RiShieldKeyholeLine } from "react-icons/ri";
import { FaEyeSlash, FaEye, FaArrowLeft } from "react-icons/fa";

function UpdatePassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.pathname.split("/").pop();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Calculate password strength
    useEffect(() => {
        const calculateStrength = (password) => {
            let strength = 0;
            if (password.length > 6) strength += 1;
            if (password.length > 10) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            return strength;
        };

        setPasswordStrength(calculateStrength(formData.password));

        // Check if passwords match
        if (formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        }
    }, [formData.password, formData.confirmPassword]);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (passwordsMatch) {
            dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate));
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "#FF4D4F";
        if (passwordStrength <= 3) return "#FAAD14";
        return "#52C41A";
    };

    const getStrengthText = () => {
        if (passwordStrength <= 1) return "Weak";
        if (passwordStrength <= 3) return "Medium";
        return "Strong";
    };

    // Framer Motion variants
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.3
            }
        },
        hover: { 
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(99, 102, 241, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    // Floating background shapes
    const shapes = [
        { x: "10%", y: "10%", size: 100, delay: 0 },
        { x: "80%", y: "20%", size: 120, delay: 0.3 },
        { x: "20%", y: "70%", size: 80, delay: 0.6 },
        { x: "70%", y: "80%", size: 160, delay: 0.9 }
    ];

    return (
        <motion.div 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#13111C] via-[#171429] to-[#13111C] p-4 overflow-hidden relative"
        >
            {/* Floating background shapes */}
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 blur-3xl"
                    style={{ 
                        left: shape.x, 
                        top: shape.y, 
                        width: shape.size, 
                        height: shape.size 
                    }}
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.5, 0.3], 
                        scale: [1, 1.1, 1],
                        x: [0, 10, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{ 
                        duration: 8, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        delay: shape.delay
                    }}
                />
            ))}

            {loading ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center text-white"
                >
                    <motion.div 
                        className="w-20 h-20 rounded-full border-4 border-[#6366F1] border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                    <motion.p 
                        className="mt-6 text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Updating password...
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div 
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-[#1E1A2D]/90 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.25)] overflow-hidden border border-[#6366F1]/20"
                >
                    <div className="p-10">
                        <motion.div 
                            className="flex items-center justify-center mb-8"
                            variants={itemVariants}
                        >
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                >
                                    <RiShieldKeyholeLine size={36} className="text-white" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.h1 
                            className="text-3xl font-bold text-white mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                            variants={itemVariants}
                        >
                            Reset Password
                        </motion.h1>
                        
                        <motion.p 
                            className="text-[#A0AEC0] text-center mb-8"
                            variants={itemVariants}
                        >
                            Create a new secure password for your account
                        </motion.p>

                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <div className="flex items-center text-[#E2E8F0] font-medium mb-2">
                                        <RiLockPasswordLine className="mr-2" />
                                        <p>New Password <span className="text-[#F56565]">*</span></p>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            className="w-full px-5 py-4 bg-[#2D2A3D] text-white rounded-xl border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all duration-300 pr-12"
                                            placeholder="Enter your new password"
                                            value={formData.password}
                                            onChange={handleOnChange}
                                        />
                                        <motion.span 
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#A0AEC0] hover:text-white transition duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    size={20}
                                                />
                                            ) : (
                                                <FaEye 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    size={20}
                                                />
                                            )}
                                        </motion.span>
                                        <motion.div 
                                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    {formData.password && (
                                        <motion.div 
                                            className="mt-2 flex items-center"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="text-xs mr-2">Strength:</p>
                                            <p className="text-xs font-medium" style={{ color: getStrengthColor() }}>
                                                {getStrengthText()}
                                            </p>
                                        </motion.div>
                                    )}
                                </label>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <div className="flex items-center text-[#E2E8F0] font-medium mb-2">
                                        <RiLockPasswordFill className="mr-2" />
                                        <p>Confirm Password <span className="text-[#F56565]">*</span></p>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            required
                                            placeholder="Confirm your new password"
                                            value={formData.confirmPassword}
                                            className={`w-full px-5 py-4 bg-[#2D2A3D] text-white rounded-xl border ${!passwordsMatch && formData.confirmPassword ? 'border-[#FF4D4F]' : 'border-[#4A5568]'} focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all duration-300 pr-12`}
                                            onChange={handleOnChange}
                                        />
                                        <motion.span 
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#A0AEC0] hover:text-white transition duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    size={20}
                                                />
                                            ) : (
                                                <FaEye 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    size={20}
                                                />
                                            )}
                                        </motion.span>
                                    </div>
                                    {!passwordsMatch && formData.confirmPassword && (
                                        <motion.p 
                                            className="mt-1 text-[#FF4D4F] text-xs"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Passwords don't match
                                        </motion.p>
                                    )}
                                </label>
                            </motion.div>

                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                type="submit"
                                disabled={!passwordsMatch}
                                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Update Password</span>
                                <motion.span 
                                    className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default UpdatePassword;