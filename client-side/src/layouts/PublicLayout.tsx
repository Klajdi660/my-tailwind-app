import { FormListProvider } from "../contexts";
import { ProviderProps } from "../types";

export const PublicLayout = ({
  children,
  ...restProps
}: ProviderProps): JSX.Element => {
  return (
    <div className="public_layout">
      <FormListProvider>{children}</FormListProvider>
    </div>
  );
};
