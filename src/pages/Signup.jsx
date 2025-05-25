import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import p from "../assets/Images/signup.webp";

import {setSignUpData} from '../redux/slices/authSlice'
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/apiCalls/authCall";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const tabData = [
    { id: 1, tabName: "Student", type: "Student" },
    { id: 2, tabName: "Instructor", type: "Instructor" },
  ];

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const signUpData = {
      ...formData,
      accountType: accountType.toLowerCase()
    }
    dispatch(setSignUpData(signUpData));
    dispatch(sendOtp({email:formData.email,navigate}));
    // console.log({ ...formData, accountType: accountType.toLowerCase() });
  };

  return (
    <div className="min-h-screen pt-5 md:mt-0 flex items-center justify-center bg-gradient-to-r from-[#1A202C] via-[#000000] to-[#121418] text-white">
      <div className="container max-w-6xl bg-gray-800 p-8 rounded-xl shadow-xl">
        <div className="text-center mb-6 -mt-2 md:-mt-4">
          <h2 className="text-4xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200">
            Welcome to Our Community
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg">
            Create your account to unlock exciting features and opportunities.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Form Section */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            {/* Tab Component */}
            <div
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
            >
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAccountType(tab.type)}
                  className={`${
                    accountType === tab.type
                      ? "bg-richblack-900 text-richblack-5"
                      : "bg-transparent text-gray-400"
                  } py-2 px-5 rounded-full transition-all duration-200`}
                >
                  {tab?.tabName}
                </button>
              ))}
            </div>

            {/* Signup Form */}
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-5">
              <div className="flex gap-x-4">
                <label className="flex-1">
                  <p className="mb-1 text-sm text-gray-400">
                    First Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="w-full rounded-lg bg-richblack-800 p-3 text-white 
                     shadow-sm shadow-richblack-500
                    focus:outline-none"
                  />
                </label>
                <label className="flex-1">
                  <p className="mb-1 text-sm text-gray-400">
                    Last Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="w-full rounded-lg bg-richblack-800 p-3 text-white 
                     shadow-sm shadow-richblack-500
                    focus:outline-none"
                  />
                </label>
              </div>

              <label>
                <p className="mb-1 text-sm text-gray-400">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-lg bg-richblack-800 p-3 text-white 
                     shadow-sm shadow-richblack-500
                    focus:outline-none"
                />
              </label>

              <div className="flex gap-x-4 md:flex-row flex-col gap-y-5">
                <label className="relative flex-1">
                  <p className="mb-1 text-sm text-gray-400 ">
                    Create Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    className="w-full rounded-lg bg-richblack-800 p-3 text-white 
                     shadow-sm shadow-richblack-500
                    focus:outline-none"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        size={24}
                        className="text-gray-400"
                      />
                    ) : (
                      <AiOutlineEye size={24} className="text-gray-400" />
                    )}
                  </span>
                </label>
                <label className="relative flex-1">
                  <p className="mb-1 text-sm text-gray-400">
                    Confirm Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm password"
                    className="w-full rounded-lg bg-richblack-800 p-3 text-white 
                     shadow-sm shadow-richblack-500
                    focus:outline-none"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-9 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible
                        size={24}
                        className="text-gray-400"
                      />
                    ) : (
                      <AiOutlineEye size={24} className="text-gray-400" />
                    )}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-[#d8b234] py-3 text-lg font-semibold text-black shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Create Account
              </button>
            </form>

            <p className="mt-4 text-center text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-400 hover:underline hover:text-yellow-300"
              >
                Login here
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-full "
              src={p}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
