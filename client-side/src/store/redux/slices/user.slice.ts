import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user2: localStorage.user ? localStorage.user.id : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser2(state, value) {
      state.user2 = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser2 } = profileSlice.actions;
export default profileSlice.reducer;
