import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/apiCalls/authCall';
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash, FaEye, FaArrowLeft } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";

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
        if (passwordStrength <= 1) return "#FF4D4F"; // Red
        if (passwordStrength <= 3) return "#FAAD14"; // Yellow
        return "#52C41A"; // Green
    };

    const getStrengthText = () => {
        if (passwordStrength <= 1) return "Weak";
        if (passwordStrength <= 3) return "Medium";
        return "Strong";
    };

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
            boxShadow: "0 10px 20px #6366F166", // Indigo with 40% opacity
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

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
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-#13111C via-#171429 to-#13111C p-4 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #13111C 0%, #171429 50%, #13111C 100%)" }} // Dark purple gradient
        >
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full blur-3xl"
                    style={{ 
                        left: shape.x, 
                        top: shape.y, 
                        width: shape.size, 
                        height: shape.size,
                        background: "linear-gradient(90deg, #6366F11A, #8B5CF61A)" // Indigo to Purple with 10% opacity
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
                        className="w-20 h-20 rounded-full border-4 border-t-transparent"
                        style={{ borderColor: "#6366F1" }} // Indigo
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                    <motion.p 
                        className="mt-6 text-xl font-medium bg-clip-text text-transparent"
                        style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }} // Indigo to Purple
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
                    className="w-full max-w-md rounded-2xl shadow-[0_25px_60px_-15px_#6366F140] overflow-hidden"
                    style={{ 
                        backgroundColor: "#1E1A2DE6", // Dark purple with 90% opacity
                        backdropFilter: "blur(24px)",
                        border: "1px solid #6366F133" // Indigo with 20% opacity
                    }}
                >
                    <div className="p-10">
                        <motion.div 
                            className="flex items-center justify-center mb-8"
                            variants={itemVariants}
                        >
                            <div 
                                className="h-20 w-20 rounded-full flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }} // Indigo to Purple
                            >
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                >
                                    <RiShieldKeyholeLine size={36} style={{ color: "#FFFFFF" }} /> {/* White */}
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.h1 
                            className="text-3xl font-bold text-white mb-2 text-center bg-clip-text text-transparent"
                            variants={itemVariants}
                            style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }} // Indigo to Purple
                        >
                            Reset Password
                        </motion.h1>
                        
                        <motion.p 
                            className="text-center mb-8"
                            variants={itemVariants}
                            style={{ color: "#A0AEC0" }} // Light gray
                        >
                            Create a new secure password for your account
                        </motion.p>

                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <div className="flex items-center font-medium mb-2" style={{ color: "#E2E8F0" }}> {/* Slate */}
                                        <RiLockPasswordLine className="mr-2" />
                                        <p>New Password <span style={{ color: "#F56565" }}>*</span></p> {/* Red */}
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            className="w-full px-5 py-4 rounded-xl transition-all duration-300 pr-12"
                                            placeholder="Enter your new password"
                                            value={formData.password}
                                            onChange={handleOnChange}
                                            style={{ 
                                                backgroundColor: "#2D2A3D", // Dark purple
                                                color: "#FFFFFF", // White
                                                borderColor: "#4A5568", // Gray
                                                outline: "none",
                                                boxShadow: "none"
                                            }}
                                        />
                                        <motion.span 
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer transition duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            style={{ color: "#A0AEC0" }} // Light gray
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
                                            className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                            style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }} // Indigo to Purple
                                        />
                                    </div>
                                    {formData.password && (
                                        <motion.div 
                                            className="mt-2 flex items-center"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="text-xs mr-2" style={{ color: "#A0AEC0" }}>Strength:</p> {/* Light gray */}
                                            <p className="text-xs font-medium" style={{ color: getStrengthColor() }}>
                                                {getStrengthText()}
                                            </p>
                                        </motion.div>
                                    )}
                                </label>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block">
                                    <div className="flex items-center font-medium mb-2" style={{ color: "#E2E8F0" }}> {/* Slate */}
                                        <RiLockPasswordFill className="mr-2" />
                                        <p>Confirm Password <span style={{ color: "#F56565" }}>*</span></p> {/* Red */}
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            required
                                            placeholder="Confirm your new password"
                                            value={formData.confirmPassword}
                                            className="w-full px-5 py-4 rounded-xl transition-all duration-300 pr-12"
                                            onChange={handleOnChange}
                                            style={{ 
                                                backgroundColor: "#2D2A3D", // Dark purple
                                                color: "#FFFFFF", // White
                                                borderColor: !passwordsMatch && formData.confirmPassword ? "#FF4D4F" : "#4A5568", // Red or Gray
                                                outline: "none",
                                                boxShadow: "none"
                                            }}
                                        />
                                        <motion.span 
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer transition duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            style={{ color: "#A0AEC0" }} // Light gray
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
                                            className="mt-1 text-xs"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ color: "#FF4D4F" }} // Red
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
                                className="w-full py-4 px-6 rounded-xl font-medium shadow-lg transition duration-300 relative overflow-hidden group"
                                style={{ 
                                    background: "linear-gradient(90deg, #6366F1, #8B5CF6)", // Indigo to Purple
                                    color: "#FFFFFF" // White
                                }}
                            >
                                <span className="relative z-10">Reset Password</span>
                                <motion.span 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ background: "linear-gradient(90deg, #8B5CF6, #6366F1)" }} // Purple to Indigo
                                />
                            </motion.button>
                        </form>

                        <motion.div 
                            className="mt-6 text-center"
                            variants={itemVariants}
                        >
                            <Link 
                                to="/login" 
                                className="flex items-center justify-center transition duration-200"
                                style={{ color: "#A0AEC0" }} // Light gray
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to Login
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default UpdatePassword;