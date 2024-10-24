import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  remember: false,
  saveUserAuthData: null,
};

const slice = createSlice({
  name: "rememberMe",
  initialState,
  reducers: {
    setRemember(state, action) {
      state.remember = action.payload;
    },
    setSaveUserAuthData(state, action) {
      state.saveAuthUserData = action.payload;
    },
  },
});

export const { setRemember, setSaveUserAuthData } = slice.actions;
export default slice.reducer;
