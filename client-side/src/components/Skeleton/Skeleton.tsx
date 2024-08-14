import { FC } from "react";
import { classNames } from "../../utils";
import { SkeletonProps } from "../../types";

export const Skeleton: FC<SkeletonProps> = (props) => {
  const { className, children, ...others } = props;
  return (
    <div className={classNames("animate-pulse", className)} {...others}>
      {children}
    </div>
  );
};
