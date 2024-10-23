import { createSlice } from "@reduxjs/toolkit";
import { defaultThemeConfig } from "../../../configs";

const initialState = {
  ...defaultThemeConfig,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeConfig(state, action) {
      const updatedConfig = { ...state, ...action.payload };

      return updatedConfig;
    },
  },
});

export const { updateThemeConfig } = themeSlice.actions;
export default themeSlice.reducer;
