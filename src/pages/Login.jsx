import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/apiCalls/authCall"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const {loading}=useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatch(login({email,password,navigate}))

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-black to-gray-900 text-white font-sans">
      <div className="container max-w-4xl flex flex-col md:flex-row bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-3 text-center">Welcome Back</h2>
          <p className=" text-center mb-6 text-lg text-blue-100  font-semibold font-edu-sa">
            Log in to access your account and continue where you left off.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="flex items-center bg-gray-700 border border-gray-600 rounded-lg">
                <span className="px-3 text-gray-400">
                  <AiOutlineMail size={24} />
                </span>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 bg-transparent text-white focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6 relative">
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center bg-gray-700 border border-gray-600 rounded-lg">
                <span className="px-3 text-gray-400">
                  <AiOutlineLock size={24} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full p-4 bg-transparent text-white focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="text-gray-400 px-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </span>
              </div>
              <div className="mt-3 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-100 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-4 bg-[#FFD60A] text-black font-semibold rounded-lg text-xl shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src="https://media.istockphoto.com/id/1979416137/photo/cyber-security-and-security-password-login-online-concept-hands-typing-and-entering-username.jpg?s=612x612&w=0&k=20&c=M0dt2GRIfLawJjb7PeKM7h_Hl0YSi6CsAqRC7oxPfx8="
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
