import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  registerData: null,
  rememberData: null,
  accessToken: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterData(state, value) {
      state.registerData = value.payload;
    },
    setRememberData(state, value) {
      state.rememberData = value.payload;
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
  setRememberData,
} = slice.actions;
