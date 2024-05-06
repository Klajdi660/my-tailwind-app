import { FunctionComponent, ReactNode } from "react";
import { classNames } from "../../utils";

interface SkeletonProps {
  className: string;
  children?: ReactNode;
}

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={classNames("animate-pulse", className)} {...props}>
      {children}
    </div>
  );
};
