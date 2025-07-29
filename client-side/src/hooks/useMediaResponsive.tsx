import { useMediaQuery } from "react-responsive";

export const useMediaResponsive = () => {
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isExtraLargeScreen = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const isTopPlayHidden = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return {
    isMobile: !isLargeScreen,
    isLargeScreen,
    isExtraLargeScreen,
    isTopPlayHidden,
  };
};
