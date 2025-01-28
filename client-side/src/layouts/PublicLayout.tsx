import { FC } from "react";
import { Loading } from "../components";
import { ProviderProps } from "../types";

export const PublicLayout: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Loading />
      {children}
    </>
  );
};
