// import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { defaultThemeConfig } from "../configs";

const useUpdateAccountTheme = () => {
  const [, setThemeLS] = useLocalStorage(
    "groove-theme-config",
    defaultThemeConfig
  );

  const updateTheme = (prefs: any) => {
    setThemeLS(prefs);
  };

  return { updateTheme };
};

export const useTheme = () => {
  // const [theme, setTheme] = useState(() => {
  //   const savedThemeConfig = localStorage.getItem("themeConfig");
  //   return savedThemeConfig ? JSON.parse(savedThemeConfig) : defaultThemeConfig;
  // });
  // // Update theme config and save to localStorage
  // const updateThemeConfig = (newConfig: any) => {
  //   const updatedConfig = { ...theme, ...newConfig };
  //   setTheme(updatedConfig);
  //   localStorage.setItem("themeConfig", JSON.stringify(updatedConfig));
  // };
  // return { theme, updateThemeConfig };

  const { updateTheme: setTheme } = useUpdateAccountTheme();
  const [themeLS] = useLocalStorage("groove-theme-config", defaultThemeConfig);

  const theme = themeLS || defaultThemeConfig;

  return [theme, setTheme];
};
