// import { FormProvider } from "../contexts";
import { ProviderProps } from "../types";
import { Loading } from "../components";

export const PublicLayout = ({
  children,
  ...restProps
}: ProviderProps): JSX.Element => {
  return (
    <div className="public_layout">
      {/* <Loading /> */}
      {children}
      {/* <FormProvider>{children}</FormProvider> */}
    </div>
  );
};
