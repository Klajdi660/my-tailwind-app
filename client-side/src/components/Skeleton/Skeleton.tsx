// import { FunctionComponent } from "react";
// import { classNames } from "../../lib";

// interface SkeletonProps {
//   className: string;
//   props?: any;
// }

// export const Skeleton: FunctionComponent<SkeletonProps> = ({
//   className,
//   ...props
// }) => {
//   return <div className={classNames("animate-pulse", className)} {...props} />;
// };

import { FunctionComponent, ReactNode } from "react";
import { classNames } from "../../lib";

interface SkeletonProps {
  className: string;
  children?: ReactNode; // Allow children to be passed
}

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  className,
  children, // Receive children
  ...props
}) => {
  return (
    <div className={classNames("animate-pulse", className)} {...props}>
      {children} {/* Render children if present */}
    </div>
  );
};
