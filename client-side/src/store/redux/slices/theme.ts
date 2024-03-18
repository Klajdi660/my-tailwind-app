import { createSlice } from "@reduxjs/toolkit";
import { defaultThemeConfig } from "../../../configs";

const persistedThemeConfigString = localStorage.getItem("themeConfig");
const persistedThemeConfig = persistedThemeConfigString
  ? JSON.parse(persistedThemeConfigString)
  : null;

const initialState = { ...defaultThemeConfig, ...(persistedThemeConfig || {}) };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeConfig(state, action) {
      const updatedConfig = { ...state, ...action.payload };

      localStorage.setItem("themeConfig", JSON.stringify(updatedConfig));
      return updatedConfig;
    },
  },
});

export const { updateThemeConfig } = themeSlice.actions;
export default themeSlice.reducer;
