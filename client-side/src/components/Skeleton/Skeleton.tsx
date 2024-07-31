import { FunctionComponent } from "react";
import { classNames } from "../../utils";
import { SkeletonProps } from "../../types";

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
