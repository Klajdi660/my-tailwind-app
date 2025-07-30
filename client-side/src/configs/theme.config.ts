import { ThemeConfig } from "../types";

export const themeConfig: ThemeConfig = {
  colors: {
    cyan: {
      primary: "#0077B5",
      primaryLightGray: "#107490",
      primaryOpacity: "rgba(16, 116, 144, 0.1)",
    },
  },
  sidebars: { folded: "80", full: "240" },
  modes: ["light", "dark"],
  players: ["lined", "boxed"],
  fontFamilies: ["fira sans", "roboto", "lato", "inter", "poppins"],
  themes: {
    theme_light: {
      neutralBg: "#eef2f6",
      neutralBgOpacity: "rgba(255, 255, 255, 0.7)",
      neutralBgAlt: "#ffffff",
      onNeutralBg: "#404040",
      onNeutralBgSecondary: "#737373",
      onNeutralBgDivider: "#e5e5e5",
      switchBg: "#f8fafc",
      cardBg: "#ffffff",
      cardSkeletonBg: "#c9d7e2",
      cardBgHover: "#e5edf5",
      player: "#919191",
    },
    theme_dark: {
      neutralBg: "#1f2937",
      neutralBgOpacity: "rgba(31, 41, 55, 0.7)",
      neutralBgAlt: "#0f1521",
      onNeutralBg: "#ffffff",
      onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgDivider: "#2a2f3d",
      switchBg: "#171c29",
      cardBg: "#111827",
      cardSkeletonBg: "#1b2132",
      cardBgHover: "#374152",
      player: "#ffffff",
    },
  },
};

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const defaultThemeConfig = {
  borderRadius: 6,
  player: themeConfig?.players?.[1],
  fontFamily: themeConfig?.fontFamilies?.[0],
  color: Object.keys(themeConfig?.colors)?.[0],
  mode: themeConfig?.modes?.[prefersDark ? 0 : 1],
  sidebar: Object.keys(themeConfig?.sidebars)?.[0],
};

export const themeMode: Record<string, string> = {
  light: "theme_light",
  dark: "theme_dark",
};

export const defaultStyles: Record<string, number> = {
  aside: 320,
  noAside: 0,
  navHeight: 80,
  playerHeight: 70,
  logoWidth: 120,
};
