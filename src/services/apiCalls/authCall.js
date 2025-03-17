import { apiConnector } from "../apiConnector";
import {
  setLoading,
  setIsAuthenticated,
  setToken,
  setUser,
} from "../../redux/slices/authSlice";
import { setUser as setUserProfile } from "../../redux/slices/profileSlice";

import { authEndpoints } from "../api"; // Define your login endpoint in authEndpoints.
import toast from "react-hot-toast";

export const sendOtp =
  ({ email, navigate }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authEndpoints.SEND_OTP_API, {
        email,
      });
      console.log(response);
      if (response.status === 200) {
        // OTP sent successfully
        console.log("OTP sent successfully");
        toast.success("OTP sent successfully");
        navigate("/verify-otp");
      } else {
        // Handle failed OTP sending

        console.error(response.data.message || "Failed to send OTP");
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signup =
  ({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    accountType,
    otp,
    navigate,
  }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        accountType,
        otp,
      });
      if (response.status === 200) {
        // Signup successful
        console.log("Signup successful");
        navigate("/login");
      } else {
        // Handle failed signup
        console.error(response.data.message || "Signup failed");
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const login =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Indicate loading state

      // API call to login
      const response = await apiConnector("POST", authEndpoints.LOGIN_API, {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful login
        console.log(response);
        const { user } = response.data;

        const { token } = response.data.user;

        // Update Redux store
        dispatch(setToken(token));
        dispatch(setUser(user));
        dispatch(setUserProfile(user));
        dispatch(setIsAuthenticated(true));


        // Save token to localStorage
        localStorage.setItem("token", token);

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to home page or dashboard
        navigate("/dashboard/home");
      } else {
        // Handle failed login
        console.error(response.data.message || "Login failed");
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false)); // Stop loading state
    }
  };

export function getPasswordResetToken({ email, setEmailSent }) {
  console.log("Email for password reset:", email);
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true
    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.RESET_PASSWORD_TOKEN_API,
        { email }
      );

      if (response?.data?.success) {
        // Ensure response format
        console.log("Password reset token response:", response.data);
        toast.success("Email sent successfully!");
        setEmailSent(true); // Notify parent component
      } else {
        toast.error(
          response?.data?.message || "Failed to send password reset email."
        );
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false)); // Always reset loading state
    }
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true
    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.RESET_PASSWORD_API,
        {
          password,
          confirmPassword,
          token,
        }
      );

      if (response?.data?.success) {
        // Ensure response format
        console.log("Password reset response:", response.data);
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response?.data?.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false)); // Always reset loading state
    }
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    console.log("Logout called");
    dispatch(setLoading(true)); // Set loading to true
    try {
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      dispatch(setLoading(false)); // Always reset loading state
    }
  };
}
