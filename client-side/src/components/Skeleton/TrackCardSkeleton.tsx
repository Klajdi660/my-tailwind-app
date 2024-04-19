import { FunctionComponent } from "react";
import { classNames } from "../../utils";
import { Skeleton } from "./Skeleton";

type ImageDimsOptions = {
  [key: number]: string;
};

interface TrackCardSkeletonProps {
  number: any[];
  imageDims: number;
}

const imageDimsOpt: ImageDimsOptions = {
  11: "h-11 w-11",
  16: "h-16 w-16",
  20: "h-20 w-20",
  28: "h-28 w-28",
};

export const TrackCardSkeleton: FunctionComponent<TrackCardSkeletonProps> = (
  props
) => {
  const { number, imageDims } = props;

  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <>
      {number.map((_, index) => (
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
