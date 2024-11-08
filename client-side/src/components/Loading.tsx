import { FC, useEffect, useState } from "react";
import { Image } from "./UI";
// import { useStore } from "../hooks";
import { iconName } from "../assets";
import { useAppSelector } from "../store";

export const Loading: FC = () => {
  // const { loading } = useStore();
  const { loading } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (loading) {
    //   setIsLoading(true);
    // } else {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 1000);
    // }
    loading ? setIsLoading(true) : setIsLoading(false);
  }, [loading]);

  if (!isLoading) return null;

  return (
    <div className="fixed z-[999] w-[100vw] h-[100vh] bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10">
      <div className="w-full">
        <div className="h-1.5 w-full bg-primary-opacity overflow-hidden">
          <div className="progress w-full h-full bg-primary left-right"></div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image imgUrl={iconName} name="Loading Img" width={200} />
      </div>
    </div>
  );
};

// bg-glassmorphism
