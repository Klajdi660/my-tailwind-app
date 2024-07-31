import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSelectedData: null,
};

export const slice = createSlice({
  name: "userSelectedData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userSelectedData = action.payload;
    },
  },
});

export const { setUserData } = slice.actions;

export default slice.reducer;
