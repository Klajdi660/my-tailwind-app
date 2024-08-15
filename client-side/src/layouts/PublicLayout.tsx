import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProviderProps } from "../types";
// import { Loading } from "../components";

export const PublicLayout: FC<ProviderProps> = ({ children }) => {
  const [parent] = useAutoAnimate();

  return (
    <div
      // className="public_layout w-full h-screen"
      ref={parent}
    >
      {/* <Loading /> */}
      {children}
    </div>
  );
};
