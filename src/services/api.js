import { legacy_createStore } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const categories = {
    CATEGORIES_API : `${BASE_URL}/courses/showAllCategories`,
}

export const authEndpoints = {
    LOGIN_API : `${BASE_URL}/auth/login`,
    SIGNUP_API : `${BASE_URL}/auth/signup`,
    SEND_OTP_API : `${BASE_URL}/auth/sendotp`,
    RESET_PASSWORD_TOKEN_API : `${BASE_URL}/auth/reset-password-token`,
    RESET_PASSWORD_API : `${BASE_URL}/auth/reset-password`,
    LOGOUT_API : `${BASE_URL}/auth/logout`,
}

export const profileEndpoints = {
    UPDATE_PROFILE:`${BASE_URL}/profile/updateProfile`,
    UPDATE_DISPLAY_PICTURE:`${BASE_URL}/profile/updateDisplayPicture`,
    GET_ENROLLED_COURSES:`${BASE_URL}/profile/getEnrolledCourses`,
    LECTURE_COMPLETE_API : `${BASE_URL}/profile/updateUserCourseProgress`,
    GET_INSTRUCTOR_DASHBOARD : `${BASE_URL}/profile/getInstructorDashboard`,
    GET_STUDENT_DASHBOARD : `${BASE_URL}/profile/getStudentDashboard`,
    SENT_MESSAGE : `${BASE_URL}/profile/sentMessage`,
}
export const courseEndpoints = {
    COURSE_CATEGORIES_API : `${BASE_URL}/courses/showAllCategories`,
    COURSE_CREATE_API : `${BASE_URL}/courses/createCourse`,
    COURSE_EDIT_API : `${BASE_URL}/courses/editCourse`,
    SECTION_CREATE_API : `${BASE_URL}/courses/addSection`,
    SECTION_UPDATE_API : `${BASE_URL}/courses/updateSection`,
    SUBSECTION_CREATE_API : `${BASE_URL}/courses/addSubSection`,
    SUBSECTION_UPDATE_API : `${BASE_URL}/courses/updateSubSection`,
    GET_INSTRUCTOR_COURSES : `${BASE_URL}/courses/getInstructorCourses`,
    COURSE_DELETE_API : `${BASE_URL}/courses/deleteCourse`,
    COURSE_DETAILS_API : `${BASE_URL}/courses/getCourseDetails`,
    FULL_COURSE_DETAILS_API : `${BASE_URL}/courses/getFullCourseDetails`,
    CATALOG_PAGE_DATA_API : `${BASE_URL}/courses/getCategoryPageDetails`,
    CREATE_RATING_API : `${BASE_URL}/courses/createRating`,
    GET_ALL_RATING_API : `${BASE_URL}/courses/getAllRatingAndReview`,
    GET_ALL_COURSES_API : `${BASE_URL}/courses/getAllCourses`,
}


export const paymentEndpoints = {
    CAPTURE_PAYMENT_API : `${BASE_URL}/payments/capturePayment`,
    VERIFY_PAYMENT_API : `${BASE_URL}/payments/verifyPayment`,
    SEND_PAYMENT_SUCCESS_EMAIL_API : `${BASE_URL}/payments/sendPaymentSuccessEmail`,
}