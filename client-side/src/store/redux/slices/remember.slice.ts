import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RememberMeState } from "../../../types";

const initialState: RememberMeState = {
  identifier: "",
  password: "",
  remember: false,
};

const slice = createSlice({
  name: "rememberMe",
  initialState,
  reducers: {
    saveRememberMeData: (state, action: PayloadAction<RememberMeState>) => {
      state.identifier = action.payload.identifier;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
    },
    clearRememberMeData: (state) => {
      state.identifier = "";
      state.password = "";
      state.remember = false;
    },
    updateRememberMeData: (state, action: PayloadAction<RememberMeState>) => {
      if (state.remember) {
        state.identifier = action.payload.identifier;
        state.password = action.payload.password;
      }
    },
  },
});

export const { saveRememberMeData, clearRememberMeData, updateRememberMeData } =
  slice.actions;
export default slice.reducer;
