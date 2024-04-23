import { FunctionComponent } from "react";
// import { loader } from "../assets/img";

interface LoadingPorps {}

export const Loading: FunctionComponent<LoadingPorps> = () => {
  return (
    // Loading 1
    // <img
    //   src={loader}
    //   alt="loader"
    //   className="w-[100px] h-[100px] object-contain"
    // />

    // Loading 2
    <div className="wrapper">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
    </div>
  );
};
