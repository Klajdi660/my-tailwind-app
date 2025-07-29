import { FC } from "react";
import { startCase } from "lodash";
import {
  defaultStyles,
  defaultThemeConfig,
  themeConfig,
  themeMode,
} from "../configs";
import { useAppSelector } from "../store";
import { useMediaResponsive } from "../hooks";

export const StylesProvider: FC = () => {
  const { aside, noAside, navHeight, playerHeight, logoWidth } = defaultStyles;

  const { isMobile, isLargeScreen, isExtraLargeScreen } = useMediaResponsive();

  const themeStorage = useAppSelector((state) => state.theme);

  const { mode, color, sidebar, fontFamily, borderRadius } =
    themeStorage || defaultThemeConfig;

  const { colors, themes, sidebars } = themeConfig || {};

  const theme = themeMode[mode];
  const themeObj = themes?.[theme];
  const colorObj = colors?.[color];
  const sT = sidebars?.[sidebar];

  const asideMobile = isExtraLargeScreen ? aside : noAside;
  const sidebarWidth = isLargeScreen ? sT : noAside;

  const {
    cardBg,
    player,
    switchBg,
    neutralBg,
    cardBgHover,
    onNeutralBg,
    neutralBgAlt,
    cardSkeletonBg,
    neutralBgOpacity,
    onNeutralBgDivider,
    onNeutralBgSecondary,
  } = themeObj || {};

  const { primary, primaryOpacity, primaryLightGray } = colorObj || {};

  const styles = `
    :root {   
      --main-margin-top: ${navHeight}px;
      --cardBg: ${cardBg};
      --primary: ${primary};
      --playerBg: ${player};
      --logo-width: ${logoWidth}px;
      --switchBg: ${switchBg};
      --neutralBg: ${neutralBg};
      --aside-width: ${aside}px;
      --nav-height: ${navHeight}px;
      --cardBgHover: ${cardBgHover};
      --onNeutralBg: ${onNeutralBg};
      --neutralBgAlt: ${neutralBgAlt};
      --player-height: ${playerHeight}px;
      --border-radius: ${borderRadius}px;
      --cardSkeletonBg: ${cardSkeletonBg};
      --primary-opacity: ${primaryOpacity};
      --neutralBgOpacity: ${neutralBgOpacity};
      --font-family: ${startCase(fontFamily)};
      --neutralBgOpacity: ${neutralBgOpacity};
      --primary-light-gray: ${primaryLightGray};
      --nav-width: calc(100vw - ${asideMobile}px);
      --onNeutralBgDivider: ${onNeutralBgDivider};
      --sidebar-horizontal-width: ${sidebarWidth}px;
      --onNeutralBgSecondary: ${onNeutralBgSecondary};
      --sidebar-width: ${isMobile ? sidebars["full"] : sT}px;
      --other-main-width: calc(100% - ${sidebarWidth}px);
      --main-width: calc(100% - ${sidebarWidth}px - ${asideMobile}px);
    }
  `;

  return <style>{styles}</style>;
};
