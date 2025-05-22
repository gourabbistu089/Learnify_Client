import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/apiCalls/authCall";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import { Loader, ArrowLeft, LockKeyhole, RotateCw } from "lucide-react"; // Updated icon imports

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0); // State for the resend OTP countdown
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signUpData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, [signUpData, navigate]);

  // Countdown timer for resending OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer); // Cleanup timer on component unmount or countdown end
  }, [countdown]);

  const handleResendOtp = () => {
    if (countdown === 0) {
      dispatch(sendOtp({ email: signUpData.email, navigate }));
      setCountdown(30); // Set 30 seconds cooldown after resending
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      accountType,
      confirmPassword,
      password,
      firstName,
      lastName,
    } = signUpData;

    dispatch(
      signup({
        email,
        accountType,
        confirmPassword,
        password,
        firstName,
        lastName,
        otp,
        navigate,
      })
    );
  };

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A202C] via-[#0e131b] to-[#27174c] text-white p-4 sm:p-6">
      <motion.div
        className="max-w-xl w-full bg-gray-800 bg-opacity-95 rounded-2xl p-6 sm:p-10 shadow-3xl border border-gray-700 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <motion.div
            className="flex flex-col items-center justify-center h-64 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader className="text-7xl animate-spin text-yellow-400" /> {/* Changed Loader2 to Loader */}
            <p className="text-2xl font-semibold text-gray-200">Verifying OTP...</p>
            <p className="text-sm text-gray-400">Please wait a moment.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <motion.div className="text-center" variants={itemVariants}>
              <LockKeyhole className="text-6xl text-yellow-400 mx-auto mb-4" /> {/* Changed MailCheck to LockKeyhole */}
              <h1 className="text-4xl font-extrabold text-white mb-2">Verification Code</h1> {/* Updated heading */}
              <p className="text-base text-gray-300">
                Enter the 6-digit verification code sent to your email address.
              </p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-8" variants={itemVariants}>
              <div className="flex justify-center gap-1 sm:gap-2"> {/* Removed bg-pink-3009 */}
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="text-[#FCD34D] px-1">•</span>}
                  // Using inputStyle to explicitly set width and height for better control
                  inputStyle={{
                    width: '3.3rem', // Equivalent to w-14 (56px)
                    height: '3.3rem', // Equivalent to h-14 (56px)
                    backgroundColor: '#374151', // bg-gray-700
                    border: '1px solid #4B5563', // border-gray-600
                    textAlign: 'center',
                    fontSize: '1.5rem', // text-2xl
                    borderRadius: '0.5rem', // rounded-lg
                    color: '#FCD34D', // text-yellow-400
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // shadow-md
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  focusStyle={{ // Styles applied on focus
                    borderColor: '#FCD34D', // focus:border-yellow-400
                    boxShadow: '0 0 0 3px rgba(252, 211, 77, 0.5)', // focus:ring-2 focus:ring-yellow-500
                  }}
                  renderInput={(props) => (
                    <motion.input
                      {...props}
                      // Removed w-12 h-12 sm:w-14 sm:h-14 from here as inputStyle handles dimensions
                      className="rounded-xl text-yellow-400 font-bold" // Keep other styling classes
                      whileFocus={{ scale: 1.05 }}
                    />
                  )}
                  containerStyle="flex justify-center gap-2"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ backgroundColor: "#eab308" }} // hover color - yellow-500
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-lg font-bold text-gray-900 bg-yellow-400 shadow-lg transition-all focus:ring-4 focus:ring-yellow-500/50 outline-none"
                disabled={otp.length !== 6} // Disable button until OTP is fully entered
              >
                Verify & Continue
              </motion.button>
            </motion.form>

            <motion.div className="flex flex-col sm:flex-row justify-between items-center mt-10 space-y-4 sm:space-y-0" variants={itemVariants}>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 text-base font-medium"
              >
                <motion.span
                  whileHover={{ x: -3 }}
                  className="bg-gray-700 p-1.5 rounded-md group-hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft size={16} />
                </motion.span>
                Back to Login
              </Link>

              <motion.button
                onClick={handleResendOtp}
                disabled={countdown > 0} // Disable button during countdown
                whileHover={countdown === 0 ? { scale: 1.05 } : {}} // Only animate hover if not disabled
                className={`inline-flex items-center gap-2 py-2 px-4 rounded-md ${
                  countdown > 0
                    ? "text-gray-400 bg-gray-700 cursor-not-allowed"
                    : "text-yellow-300 bg-gray-700 hover:bg-gray-600"
                } transition-colors text-sm font-medium`}
              >
                <RotateCw size={16} className={countdown > 0 ? "animate-spin" : ""} /> {/* Changed RefreshCw to RotateCw */}
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default VerifyOtp;
