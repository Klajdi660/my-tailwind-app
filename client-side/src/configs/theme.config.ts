import { ThemeConfig } from "../types";

export const themeConfig: ThemeConfig = {
  colors: {
    cyan: {
      primary: "#0077B5",
      primaryLightGray: "#107490",
      primaryOpacity: "rgba(16, 116, 144, 0.1)",
    },
  },
  sidebars: {
    folded: "80",
    full: "200",
  },
  modes: ["light", "dark"],
  players: ["lined", "boxed"],
  fontFamilies: ["fira sans", "roboto", "lato", "inter", "poppins"],
  themes: {
    theme_light: {
      cardBg: "#ffffff",
      player: "#919191",
      switchBg: "#f8fafc",
      neutralBg: "#eef2f6",
      cardBgHover: "#e5edf5",
      onNeutralBg: "#404040",
      neutralBgAlt: "#ffffff",
      cardSkeletonBg: "#c9d7e2",
      onNeutralBgDivider: "#e5e5e5",
      onNeutralBgSecondary: "#737373",
      neutralBgOpacity: "rgba(255, 255, 255, 0.7)",
    },
    theme_dark: {
      cardBg: "#111827",
      player: "#ffffff",
      switchBg: "#171c29",
      neutralBg: "#1f2937",
      cardBgHover: "#374152",
      onNeutralBg: "#ffffff",
      neutralBgAlt: "#0f1521",
      cardSkeletonBg: "#1b2132",
      onNeutralBgDivider: "#2a2f3d",
      onNeutralBgSecondary: "#a3a3a3",
      neutralBgOpacity: "rgba(31, 41, 55, 0.7)",
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
  sidebar: Object.keys(themeConfig?.sidebars)?.[1],
};
