import { startCase } from "lodash";
import { useMediaQuery } from "react-responsive";
import { themeConfig, defaultThemeConfig } from "../configs";
import { useSelector } from "react-redux";
import { useMobileResponsive } from "../utils";

export const StylesProvider = () => {
  const themeStorage = useSelector((state: any) => state.theme);
  const isMobile = useMobileResponsive();

  const { mode, color, sidebar, layout, fontFamily, borderRadius } =
    themeStorage || defaultThemeConfig;

  const { colors, themes, sidebars }: any = themeConfig || {};

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isExtraLargeScreen = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const theme = mode === "light" ? "theme_light" : `theme_dark_${color}`;

  const themeObj = themes?.[theme];
  const colorObj = colors?.[color];
  const sT = sidebars?.[sidebar];

  const aside = 320;
  const asideMobile = isExtraLargeScreen ? aside : 0;
  const navHeight = 80;
  const playerHeight = 70;

  const sidebarWidth = isLargeScreen ? sT : 0;

  const {
    neutralBg,
    neutralBgOpacity,
    neutralBgAlt,
    onNeutralBg,
    onNeutralBgSecondary,
    player,
    onNeutralBgDivider,
    switchBg,
    cardBg,
    cardSkeletonBg,
    cardBgHover,
  } = themeObj || {};

  const { primary, primaryOpacity, primaryLightGray } = colorObj || {};

  const styles = `
    :root {
      --primary: ${primary};
      --primary-light-gray: ${primaryLightGray};
      --primary-opacity: ${primaryOpacity};
      --neutralBg: ${neutralBg};
      --neutralBgOpacity: ${neutralBgOpacity};
      --neutralBgAlt: ${neutralBgAlt};
      --onNeutralBg: ${onNeutralBg};
      --onNeutralBgSecondary: ${onNeutralBgSecondary};
      --playerBg: ${player};
      --onNeutralBgDivider: ${onNeutralBgDivider};
      --switchBg: ${switchBg};
      --cardBg: ${cardBg};
      --cardSkeletonBg: ${cardSkeletonBg};
      --cardBgHover: ${cardBgHover};
      --sidebar-width: ${isMobile ? sidebars["full"] : sT}px;
      --aside-width: ${aside}px;
      --sidebar-horizontal-width: ${sidebarWidth}px;
      --nav-height: ${navHeight}px;
      --nav-width: calc(100vw - ${asideMobile}px - ${isMobile ? "0" : "5"}px);
      --player-height: ${playerHeight}px;
      --logo-width: ${120}px;
      --main-width: calc(100% - ${sidebarWidth}px - ${asideMobile}px);
      --main-margin-top: ${
        `${navHeight}px`
        // !isMobile ? `${navHeight * 2}px` : `${navHeight}px`
      };
      --direction: ${layout};
      --font-family: ${startCase(fontFamily)};
      --border-radius: ${borderRadius}px;
    }
  `;

  return <style>{styles}</style>;
};
