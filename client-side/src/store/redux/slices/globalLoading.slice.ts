import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
};

export const slice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = slice.actions;
export default slice.reducer;
