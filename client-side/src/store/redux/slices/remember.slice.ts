import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RememberMeState } from "../../../types";

const initialState: RememberMeState = {
  password: "",
  identifier: "",
  remember: false,
  rememberType: "",
};

const slice = createSlice({
  name: "rememberMe",
  initialState,
  reducers: {
    saveRememberMeData: (state, action: PayloadAction<RememberMeState>) => {
      state.password = action.payload.password;
      state.remember = action.payload.remember;
      state.identifier = action.payload.identifier;
      state.rememberType = action.payload.rememberType;
    },
    clearRememberMeData: (state) => {
      state.password = "";
      state.identifier = "";
      state.remember = false;
      state.rememberType = "";
    },
    updateRememberMeData: (state, action: PayloadAction<RememberMeState>) => {
      state.password = action.payload.password;
      state.identifier = action.payload.identifier;
    },
  },
});

export const { saveRememberMeData, clearRememberMeData, updateRememberMeData } =
  slice.actions;
export default slice.reducer;
