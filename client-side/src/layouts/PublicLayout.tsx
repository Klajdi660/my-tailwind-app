import { ProviderProps } from "../types";
// import { Loading } from "../components";

export const PublicLayout = ({ children }: ProviderProps) => {
  return (
    <div className="public_layout">
      {/* <Loading /> */}
      {children}
    </div>
  );
};
