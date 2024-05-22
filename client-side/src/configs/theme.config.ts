import { ThemeConfig } from "../types";

export const themeConfig: ThemeConfig = {
  modes: ["light", "dark"],
  colors: {
    cyan: {
      primary: "#0077B5",
      primaryLightGray: "#107490",
      primaryOpacity: "rgba(16, 116, 144, 0.1)",
    },
  },
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
    theme_dark_cyan: {
      // neutralBg: "#1f2937",
      neutralBg: "rgb(18, 18, 18)",
      // neutralBgOpacity: "rgba(31, 41, 55, 0.7)",
      neutralBgOpacity: "#1b1f23",
      neutralBgAlt: "#0f1521",
      onNeutralBg: "#ffffff",
      // onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgSecondary: "#ffffffbf",
      onNeutralBgDivider: "#2a2f3d",
      switchBg: "#171c29",
      cardBg: "#111827",
      cardSkeletonBg: "#1b2132",
      cardBgHover: "#374152",
      player: "#ffffff",
    },
  },
  players: ["lined", "boxed"],
  fontFamilies: ["fira sans", "roboto", "lato", "inter", "poppins"],
  sidebars: {
    folded: "80",
    full: "200",
  },
};

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const defaultThemeConfig = {
  mode: themeConfig?.modes?.[prefersDark ? 1 : 0],
  color: Object.keys(themeConfig?.colors)?.[0],
  sidebar: Object.keys(themeConfig?.sidebars)?.[1],
  fontFamily: themeConfig?.fontFamilies?.[0],
  player: themeConfig?.players?.[1],
  borderRadius: 6,
};
