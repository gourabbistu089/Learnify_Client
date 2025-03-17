import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   loading:false,
   courses:[]
};

const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers : {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setCourses(state, action) {
            state.courses = action.payload;
        },
    }
})

export const {setUser , setLoading , setCourses} = profileSlice.actions;
export default profileSlice.reducer