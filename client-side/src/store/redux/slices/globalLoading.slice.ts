import { createSlice } from "@reduxjs/toolkit";

export const globaLoadingSlice = createSlice({
  name: "loading",
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globaLoadingSlice.actions;
export default globaLoadingSlice.reducer;
