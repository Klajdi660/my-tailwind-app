import { FunctionComponent } from "react";
import { classNames } from "../../lib";
import { Skeleton } from "./Skeleton";

interface TitleSkeletonProps {
  type: string;
}

export const TitleSkeleton: FunctionComponent<TitleSkeletonProps> = (props) => {
  const { type } = props;

  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <div className="mb-4">
      <Skeleton className="w-full p-4 rounded bg-card-skeleton">
        <Skeleton
          className={classNames(
            "w-1/3 h-[36px] aspect-square rounded",
            gradientClass,
            type
          )}
        />
        {!["top-pick"].includes(type || "") && (
          <div>
            <Skeleton className={`w-1/3 h-4 rounded ${gradientClass} mt-3`} />
          </div>
        )}
      </Skeleton>
    </div>
  );
};