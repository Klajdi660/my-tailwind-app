// import { FormProvider } from "../contexts";
import { ProviderProps } from "../types";

export const PublicLayout = ({
  children,
  ...restProps
}: ProviderProps): JSX.Element => {
  return (
    <div className="public_layout">
      {children}
      {/* <FormProvider>{children}</FormProvider> */}
    </div>
  );
};
