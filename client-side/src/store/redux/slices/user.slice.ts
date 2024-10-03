import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
  currency: "L",
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export default slice.reducer;
export const { setUser, setCurrency } = slice.actions;
