import { FC, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface TabTitleProps {}

export const TabTitle: FC<TabTitleProps> = () => {
  const { pathname } = useLocation();
  const pathKey = pathname.split("/")[1];

  const capitalizedPathKey = pathKey
    ? `${pathKey[0].toUpperCase() + pathKey.slice(1)}  | GrooveIT`
    : "";

  useEffect(() => {
    document.title = capitalizedPathKey;
  }, [pathname]);
  return <></>;
};
