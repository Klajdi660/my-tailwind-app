import { FunctionComponent } from "react";
import { LoadingPorps } from "../types";

export const Loading: FunctionComponent<LoadingPorps> = () => {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-primary-opacity overflow-hidden">
        <div className="progress w-full h-full bg-primary left-right"></div>
      </div>
    </div>
  );
};
