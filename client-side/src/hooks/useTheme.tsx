import { useState } from "react";
import { defaultThemeConfig } from "../configs";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedThemeConfig = localStorage.getItem("themeConfig");
    return savedThemeConfig ? JSON.parse(savedThemeConfig) : defaultThemeConfig;
  });

  // Update theme config and save to localStorage
  const updateThemeConfig = (newConfig: any) => {
    const updatedConfig = { ...theme, ...newConfig };
    setTheme(updatedConfig);
    localStorage.setItem("themeConfig", JSON.stringify(updatedConfig));
  };

  return { theme, updateThemeConfig };
};
