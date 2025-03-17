import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/apiCalls/authCall";
import OTPInput from "react-otp-input";
import { FaSpinner } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

function VerifyOtp() {
  const [otp, setOtp] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signUpData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, [signUpData, navigate]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-purple-900 text-white px-6">
      <div className="max-w-lg w-full bg-gray-800 bg-opacity-90 rounded-lg p-8 shadow-2xl transform duration-300">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="text-6xl animate-spin text-yellow-400" />
            <p className="text-xl font-semibold">Verifying OTP...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Verify OTP</h1>
              <p className="text-sm text-gray-300 mt-2">
                A verification code has been sent to your email. Please enter it below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="text-yellow-500 px-2">-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-16 h-16 bg-gray-700 border border-gray-600 text-center text-2xl rounded-lg text-yellow-400 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-base font-semibold text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-600 shadow-lg transition-all"
              >
                Verify OTP
              </button>
            </form>

            <div className="flex justify-between items-center mt-8">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-all text-sm font-medium"
              >
                <BiArrowBack size={18} />
                Back to Login
              </Link>
              <button
                onClick={() => dispatch(sendOtp({ email: signUpData.email, navigate }))}
                className="text-sm text-yellow-300 hover:text-yellow-400 font-semibold focus:outline-none"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;
