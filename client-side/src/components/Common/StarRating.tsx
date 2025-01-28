import { FC } from "react";
import { Icon } from "../../components";
import { classNames } from "../../utils";
import { StarRatingProps } from "../../types";

export const StarRating: FC<StarRatingProps> = ({ star, maxStar }) => {
  if (star === 0) return <p></p>;

  return (
    <div className="flex gap-[2px]">
      {[...new Array(maxStar)].map((_, index) => (
        <Icon
          className={classNames(index < star && "text-primary")}
          key={index}
          name="AiFillStar"
          size={15}
        />
      ))}
    </div>
  );
};
