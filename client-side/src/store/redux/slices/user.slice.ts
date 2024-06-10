import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setLoading } = profileSlice.actions;
export default profileSlice.reducer;
