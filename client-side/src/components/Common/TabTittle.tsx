/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const TabTitle: FC = () => {
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
