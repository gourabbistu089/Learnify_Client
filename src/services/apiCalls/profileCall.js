import { apiConnector } from "../apiConnector";
import {
  setLoading,
  setUser,
  setCourses,
} from "../../redux/slices/profileSlice";
import { setUser as setUserAuth } from "../../redux/slices/authSlice";

import { profileEndpoints } from "../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const token = localStorage.getItem("token");
// console.log(token);

export const updateProfile =
  ({ gender, dateOfBirth, contactNumber, address, about }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated. Please log in again.");
      dispatch(setLoading(false));
      return;
    }
    try {
      const response = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_PROFILE,
        { gender, dateOfBirth, contactNumber, address, about },
        { Authorization: `Bearer ${token}` }
      );
      if (response.status === 200) {
        console.log("Updated Profile Successfully");
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        dispatch(setUser(response?.data?.data));
        dispatch(setUserAuth(response?.data?.data));
        toast.success("Updated Profile Successfully");
      } else {
        console.log("Error in Updating Profile");
        toast.error("Error in Updating Profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in Updating Profile");
    } finally {
      dispatch(setLoading(false)); // Properly dispatch setLoading
    }
  };

export const updateDisplayPicture =
  ({ image }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated. Please log in again.");
      dispatch(setLoading(false));
      return;
    }
    try {
      const fromData = new FormData();
      fromData.append("image", image);
      const response = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_DISPLAY_PICTURE,
        fromData,
        { Authorization: `Bearer ${token}` }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Updated Display Picture Successfully");
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        dispatch(setUser(response?.data?.data));
        dispatch(setUserAuth(response?.data?.data));
        toast.success("Updated Display Picture Successfully");
      } else {
        console.log("Error in Updating Display Picture");
        toast.error("Error in Updating Display Picture");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in Updating Display Picture");
    } finally {
      dispatch(setLoading(false)); // Properly dispatch setLoading
    }
  };

export const getUserEnrolledCoures = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    dispatch(setLoading(false));
    return;
  }
  let courses = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_ENROLLED_COURSES,
      null,
      { Authorization: `Bearer ${token}` }
    );
    // console.log("getEnrolledCourses", response);
    if (response.status === 200) {
      courses = response?.data?.data;
      toast.success("Enrolled Courses Successfully");
    } else {
      console.log("Error in Enrolled Courses");
      toast.error("Error in Enrolled Courses");
    }
  } catch (error) {
    console.log("Error in Enrolled Courses", error);
  }
  return courses;
};

export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", profileEndpoints.LECTURE_COMPLETE_API, data,  { Authorization: `Bearer ${token}` }
    );
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
}; 

export const getInstructorDashboardApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    dispatch(setLoading(false));
    return;
  }
  let courses = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_INSTRUCTOR_DASHBOARD,
      null,
      { Authorization: `Bearer ${token}` }
    );
    // console.log("getEnrolledCourses", response);
    if (response.status === 200) {
      courses = response?.data?.data;
      // toast.success("Instructor Dashboard Successfully");
    } else {
      console.log("Error in Instructor Dashboard");
      toast.error("Error in Instructor Dashboard");
    } 
  } catch (error) {
    console.log("Error in Instructor Dashboard", error);
  }
  return courses;
};
export const getStudentDashboardApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    dispatch(setLoading(false));
    return;
  }
  let courses = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_STUDENT_DASHBOARD,
      null,
      { Authorization: `Bearer ${token}` }
    );
    // console.log("getEnrolledCourses", response);
    if (response.status === 200) {
      courses = response?.data?.data;
      // toast.success("Instructor Dashboard Successfully");
    } else {
      console.log("Error in Instructor Dashboard");
      toast.error("Error in Instructor Dashboard");
    } 
  } catch (error) {
    console.log("Error in Instructor Dashboard", error);
  }
  return courses;
};

export const sentMessage = async (data) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", profileEndpoints.SENT_MESSAGE, data);
    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Message Sent Successfully");
    result = true;
  } catch (error) {
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};