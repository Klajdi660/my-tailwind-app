import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  remember: false,
  saveUserAuthData: [],
  currenSavetUserAuthIndex: null,
};

const slice = createSlice({
  name: "rememberMe",
  initialState,
  reducers: {
    setRemember(state, action) {
      state.remember = action.payload;
    },
    setSaveUserAuthData(state, action) {
      state.saveUserAuthData.push(action.payload);
    },
    setShowSaveForm(state, action) {
      state.showSaveForm = action.payload;
    },
    setCurrentSaveUserAuthIndex(state, action) {
      state.currenSavetUserAuthIndex = action.payload;
    },
  },
});

export const { setRemember, setSaveUserAuthData, setShowSaveForm } =
  slice.actions;
export default slice.reducer;
