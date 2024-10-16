import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  signupData: null,
  loading: false,
  atoken: localStorage.atoken ? localStorage.atoken : null,
  rtoken: localStorage.rtoken ? JSON.parse(localStorage.rtoken) : null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAToken(state, action) {
      state.atoken = action.payload;
    },
    setRToken(state, action) {
      state.rtoken = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  setSignupData,
  setLoading,
  setAToken,
  setRToken,
  setIsAuthenticated,
} = slice.actions;
