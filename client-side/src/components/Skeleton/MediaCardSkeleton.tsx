import { FunctionComponent } from "react";
import { Skeleton } from "./Skeleton";
import { MediaCardSkeletonProps } from "../../types";
import { classNames } from "../../utils";

export const MediaCardSkeleton: FunctionComponent<MediaCardSkeletonProps> = (
  props
) => {
  const { type, number } = props;

  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div className="col-spam-1" key={index}>
          <Skeleton className="w-full p-4 rounded bg-card-skeleton">
            <div className="aspect-square">
              <Skeleton
                className={classNames(
                  "w-full h-full",
                  gradientClass,
                  type === "artist" ? "rounded-full" : "rounded"
                )}
              />
            </div>
            <div className="flex justify-center">
              <Skeleton className={`w-20 h-4 rounded mt-4 ${gradientClass}`} />
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
};
