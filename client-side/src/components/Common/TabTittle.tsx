import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const formatTabPath = (key: string) => {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const TabTitle: FC = () => {
  const { pathname } = useLocation();
  const pathKey = pathname.split("/")[1] || "";

  const capitalizedPathKey = pathKey
    ? `${formatTabPath(pathKey)} | GrooveIT`
    : "GrooveIT";

  useEffect(() => {
    document.title = capitalizedPathKey;
  }, [capitalizedPathKey, pathname]);

  return null;
};
