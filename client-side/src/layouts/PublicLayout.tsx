import { FC } from "react";
import { ProviderProps } from "../types";
import { Loading } from "../components";

export const PublicLayout: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Loading />
      {children}
    </>
  );
};
