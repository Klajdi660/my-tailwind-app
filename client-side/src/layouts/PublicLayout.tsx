import { FC } from "react";
import { ProviderProps } from "../types";
// import { Loading } from "../components";

export const PublicLayout: FC<ProviderProps> = ({ children }) => {
  return (
    <div className="public_layout">
      {/* <Loading /> */}
      {children}
    </div>
  );
};
