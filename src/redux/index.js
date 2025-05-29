import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import courseReducer from "./slices/courseSlice";
import viewCourseReducer from "./slices/viewCourseSlice";
import blogReducer from "./slices/blogSlice";
const rootReducer =  combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    blog:blogReducer
})

export default rootReducer