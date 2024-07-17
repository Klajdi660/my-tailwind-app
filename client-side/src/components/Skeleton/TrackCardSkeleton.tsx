import { FunctionComponent } from "react";
import { Skeleton } from "./Skeleton";
import { imageDimsOpt } from "../../data";
import { TrackCardSkeletonProps } from "../../types";
import { classNames } from "../../utils";

export const TrackCardSkeleton: FunctionComponent<TrackCardSkeletonProps> = (
  props
) => {
  const { number, imageDims } = props;

  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div key={index} className="col-span-1">
          <Skeleton className="flex fle-row items-center w-full p-4 rounded bg-card-skeleton">
            <Skeleton
              className={classNames(
                "rounded",
                gradientClass,
                imageDimsOpt[imageDims]
              )}
            />
            <div className="flex flex-col gap-2 ml-3">
              <Skeleton className={`w-20 h-4 rounded ${gradientClass}`} />
              <Skeleton className={`w-32 h-4 rounded ${gradientClass}`} />
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
};
