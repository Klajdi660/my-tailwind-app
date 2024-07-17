import { FunctionComponent } from "react";
import { Skeleton } from "./Skeleton";
import { HeaderBannerSkeletonProps } from "../../types";
import { classNames } from "../../utils";

export const HeaderBannerSkeleton: FunctionComponent<
  HeaderBannerSkeletonProps
> = (props) => {
  const { type } = props;

  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <div className="nb-4">
      <Skeleton className="flex flex-col items-center w-full gap-4 p-4 rounded xs:flex-row bg-card-skeleton">
        <Skeleton
          className={classNames(
            `w-[180px] h-[180px] ${gradientClass} aspect-square`,
            type === "game-detail" ? "rounded-full" : "rounded"
          )}
        />
        <div className="flex flex-col gap-2">
          <Skeleton className={`w-[100px] h-5 rounded ${gradientClass}`} />
          <Skeleton className={`w-[150px] h-5 rounded ${gradientClass}`} />
          <Skeleton className={`w-[300px] h-10 rounded ${gradientClass}`} />
          <div className="flex items-center gap-4">
            <Skeleton className={`w-10 h-10 rounded-full ${gradientClass}`} />
            <Skeleton className={`w-10 h-10 rounded-full ${gradientClass}`} />
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
