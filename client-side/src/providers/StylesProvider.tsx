import { startCase } from "lodash";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { themeConfig, defaultThemeConfig } from "../configs";
import { RootState } from "../types";
import { useMobileResponsive } from "../utils";

export const StylesProvider = () => {
  const isMobile = useMobileResponsive();

  const themeStorage = useSelector((state: RootState) => state.theme);

  const { mode, color, sidebar, layout, fontFamily, borderRadius } =
    themeStorage || defaultThemeConfig;

  const { colors, themes, sidebars } = themeConfig || {};

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isExtraLargeScreen = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const theme = mode === "light" ? "theme_light" : "theme_dark";

  const themeObj = themes?.[theme];
  const colorObj = colors?.[color];
  const sT = sidebars?.[sidebar];

  const aside = 320;
  const asideMobile = isExtraLargeScreen ? aside : 0;
  const navHeight = 80;
  const playerHeight = 70;

  const sidebarWidth = isLargeScreen ? sT : 0;

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
      --main-margin-top: ${
        `${navHeight}px`
        // !isMobile ? `${navHeight * 2}px` : `${navHeight}px`
      };
      --cardBg: ${cardBg};
      --primary: ${primary};
      --playerBg: ${player};
      --direction: ${layout};
      --logo-width: ${120}px;
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
      --main-width: calc(100% - ${sidebarWidth}px - ${asideMobile}px);
    }
  `;

  return <style>{styles}</style>;
};

// --nav-width: calc(100vw - ${asideMobile}px - ${isMobile ? "0" : "5"}px);
