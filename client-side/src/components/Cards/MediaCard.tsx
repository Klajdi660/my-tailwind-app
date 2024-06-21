import { FunctionComponent } from "react";
import { MediaCardProps } from "../../types";
import { classNames } from "../../utils";

export const MediaCard: FunctionComponent<MediaCardProps> = () => {
  return (
    <div
      className={classNames(
        "shadow-sm p-3 rounded bg-card hover:bg-card-hover duration-300 case-in cursor-poiter group"
      )}
    >
      <div className="relative"></div>
      <div className={classNames("desc mt-4")}></div>
    </div>
  );
};
