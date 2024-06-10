import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RememberMeState {
  identifier: string;
  password: string;
  remember: boolean;
}

const initialState: RememberMeState = {
  identifier: "",
  password: "",
  remember: false,
};

const rememberMeSlice = createSlice({
  name: "rememberMe",
  initialState,
  reducers: {
    saveCredentials: (state, action: PayloadAction<RememberMeState>) => {
      state.identifier = action.payload.identifier;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
    },
    clearCredentials: (state) => {
      state.identifier = "";
      state.password = "";
      state.remember = false;
    },
  },
});

export const { saveCredentials, clearCredentials } = rememberMeSlice.actions;
export default rememberMeSlice.reducer;
