
import { BASE_URL } from "../utils/constants.js";

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
    GET_PROFILE:`${BASE_URL}/profile/getUserDetails`,
    UPDATE_DISPLAY_PICTURE:`${BASE_URL}/profile/updateDisplayPicture`,
    GET_ENROLLED_COURSES:`${BASE_URL}/profile/getEnrolledCourses`,
    LECTURE_COMPLETE_API : `${BASE_URL}/profile/updateUserCourseProgress`,
    GET_INSTRUCTOR_DASHBOARD : `${BASE_URL}/profile/getInstructorDashboard`,
    GET_STUDENT_DASHBOARD : `${BASE_URL}/profile/getStudentDashboard`,
    SENT_MESSAGE : `${BASE_URL}/profile/sentMessage`,
    TOGGLE_FOLLOW : `${BASE_URL}/profile/toggleFollow`,
    GET_CREATOR_DETAILS : `${BASE_URL}/profile/get-creator-details`,
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

export const blogEndpoints = {
    BLOG_CREATE_API : `${BASE_URL}/blogs/create-blog`,
    BLOG_GET_ALL_API : `${BASE_URL}/blogs/`,
    BLOG_GET_FOLLOWING_API : `${BASE_URL}/blogs/get-following-blogs`,

    BLOG_GET_MY_API : `${BASE_URL}/blogs/my-blogs`,
    BLOG_GET_SLUG_API : `${BASE_URL}/blogs/slug`,
    BLOG_API : `${BASE_URL}/blogs`,

    BLOG_DELETE_API : `${BASE_URL}/blogs/deleteBlog`,
    BLOG_DETAILS_API : `${BASE_URL}/blogs/getBlogDetails`,
    BLOG_ALL_DETAILS_API : `${BASE_URL}/blogs/getAllBlogs`,
    BLOG_UPDATE_VIEWS_API : `${BASE_URL}/blogs/updateBlogViews`,
}