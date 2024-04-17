// import { useEffect } from "react";
// import useLocalStorage from "use-local-storage";
// import { useMediaQuery } from "react-responsive";
// import { defaultThemeConfig } from "../configs";
// import { useTheme } from "../hooks";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({
  children,
  ...restProps
}: ThemeProviderProps): JSX.Element => {
  // const [theme, setTheme] = useTheme();

  // const [themeLS] = useLocalStorage("groove-theme-config", defaultThemeConfig);

  // const isMobile = useMediaQuery({ query: "(min-width: 1024px)" });

  // useEffect(() => {
  //   setTheme({ ...theme, ...themeLS, isMobile: !isMobile });
  // }, [isMobile]);

  // if (!theme?.color) {
  //   return <>Loading...</>;
  // }

  return <div className="app_container">{children}</div>;
};
