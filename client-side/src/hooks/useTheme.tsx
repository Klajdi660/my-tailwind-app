import { useState } from "react";
// import useLocalStorage from "use-local-storage";
import { defaultThemeConfig } from "../configs";

export const useTheme = () => {
    let [theme, setTheme] = useState<any>({});

    // const [themeLS] = useLocalStorage("groove-theme-config");
    const themeLS = JSON.parse(localStorage.getItem("groove-theme-config") as any);
    console.log('themeLS :>> ', themeLS);
    theme = themeLS || defaultThemeConfig;
    console.log('theme :>> ', theme);
    const updateTheme = (newTheme: any) => {
        console.log('newTheme :>> ', newTheme);
        setTheme(newTheme);
        localStorage.setItem("groove-theme-config", JSON.stringify(newTheme));
    };

    return [theme, updateTheme]
};