import { FunctionComponent } from "react";
import { SkeletonProps } from "../../types";
import { classNames } from "../../utils";

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
