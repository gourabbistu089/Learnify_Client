import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isAuthenticated: false,
    loading: false,
    signUpData: null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setToken(state, action) {
            state.token = action.payload;
        },
        setSignUpData(state, action) {
            state.signUpData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
    }
})

export const {setToken , setLoading, setUser, setIsAuthenticated, setSignUpData} = authSlice.actions;
export default authSlice.reducer