import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const GlobaLoading: FunctionComponent = () => {
  const { globalLoading } = useSelector((state: any) => state.globalLoading);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return <></>;
};
