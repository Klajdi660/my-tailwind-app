import { FunctionComponent } from "react";
import { iconName } from "../assets";
import { Image } from "./UI";
import { LoadingPorps } from "../types";

export const Loading: FunctionComponent<LoadingPorps> = () => {
  return (
    <div className="fixed z-[999] w-[100vw] h-[100vh] bg-glassmorphism">
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
