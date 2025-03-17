import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/apiCalls/authCall";
import { FaEnvelope, FaSpinner } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken({ email, setEmailSent }));
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="text-4xl animate-spin mb-4" />
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-richblack-900 shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-extrabold mb-4 text-center">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </h1>
          <p className="text-sm text-gray-300 mb-6 text-center">
            {emailSent
              ? "A password reset link has been sent to your email."
              : "Don't worry! Enter your email to reset your password if you have an account with us."}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-400 font-semibold mb-2"
                >
                  Email Address
                </label>
                <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                  <span className="bg-gray-800 px-3 py-2">
                    <FaEnvelope className="text-yellow-500" />
                  </span>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-200 hover:bg-yellow-300 text-black px-6 py-3 rounded-md text-sm font-bold transition-all"
              onClick={handleOnSubmit}
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center gap-2 justify-center text-gray-400 hover:text-white transition-all">
              <BiArrowBack />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
