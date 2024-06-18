import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user2: null,
  token2: null,
};

export const userSlice = createSlice({
  name: "user2",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user2 = action.payload.user2;
      state.token2 = action.payload.token;
    },

    logoutUser: (state) => {
      state.user2 = null;
      state.token2 = null;
    },
    setUser2: (state, action) => {
      state.user2 = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setUser2 } = userSlice.actions;

export default userSlice.reducer;
