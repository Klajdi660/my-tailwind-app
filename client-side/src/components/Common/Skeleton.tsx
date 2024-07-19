import { FC, HTMLProps } from "react";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: FC<HTMLProps<HTMLDivElement> & SkeletonProps> = ({
  className,
  children,
  ...others
}) => {
  return (
    <div
      className={`${className} animate-pulse bg-card-skeleton rounded-md `}
      {...others}
    >
      {children}
    </div>
  );
};
