import { FC } from "react";
import { Skeleton } from "./Skeleton";
import { classNames } from "../../utils";

export const NavlistSkeleton: FC = () => {
  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <div className="px-4 py-4">
      <Skeleton
        className={classNames(
          "w-full h-[calc(100vh-112px)] rounded",
          gradientClass
        )}
      />
    </div>
  );
};
