import { FunctionComponent, ReactNode } from "react";

interface PublicGuardProps {
  children: ReactNode;
}

export const PublicGuard: FunctionComponent<PublicGuardProps> = ({
  children,
}) => {
  return <>{children}</>;
};
