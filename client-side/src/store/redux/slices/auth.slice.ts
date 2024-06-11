import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  registerData: null,
  accessToken: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterData(state, action) {
      state.registerData = action.payload;
    },
    saveUser(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    updateToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    deleteUser(state) {
      state.user = null;
      state.accessToken = "";
    },
  },
});

export default slice.reducer;

export const {
  saveUser,
  updateUser,
  updateToken,
  deleteUser,
  setRegisterData,
} = slice.actions;
