import { FC, HTMLProps } from "react";
interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: FC<HTMLProps<HTMLDivElement> & SkeletonProps> = (
  props
) => {
  const { className, children, ...others } = props;

  return (
    <div
      className={`${className} animate-pulse bg-card-skeleton rounded-md `}
      {...others}
    >
      {children}
    </div>
  );
};
