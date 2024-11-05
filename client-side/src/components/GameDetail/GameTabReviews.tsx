/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { Image } from "../UI";
import { userIcon } from "../../assets";
import { ReadMore, StarRating } from "../Common";
import { ReviewContentProps, GameTabReviewsProps } from "../../types";
import { calculateTimePassed } from "../../utils";

const ReviewContent: FC<ReviewContentProps> = (props) => {
  const { gameReviews } = props;

  return (
    <ul className="flex flex-col gap-12 max-h-[400px] overflow-y-auto pr-4">
      {gameReviews.map((review: any) => {
        return (
          <li key={review.id} className="flex gap-7">
            <div className="shrink-0 max-w-[60px] w-full h-[60px]">
              <Image
                imgUrl={review.user ? review.user.avatar : userIcon}
                name="user_review"
                styles="w-[60px] h-[60px] rounded-full object-cover"
                effect="blur"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <p className="text-text-onNeutralBg">
                  {review.user ? review.user.username : "anonymous"}
                </p>

                <StarRating star={Math.round(review.rating / 2)} maxStar={5} />
              </div>
              <ReadMore
                className="text-secondary text-justify"
                limitTextLength={150}
              >
                {review.text}
              </ReadMore>
              <p className="text-right text-secondary">
                {calculateTimePassed(new Date(review.created).getTime())}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const GameTabReviews: FC<GameTabReviewsProps> = (props) => {
  const { gameReviews } = props;

  const [reviewSortType, setReviewSortType] = useState("desc");

  return (
    <>
      <ul className="flex gap-10 text-onNeutralBg text-lg justify-center">
        {/* <div className="flex gap-4 justify-end -mt-5 mb-10">
          <p>Sort Rating: </p>
          <select
            className="outline-none bg-inherit"
            value={reviewSortType}
            onChange={(e) => setReviewSortType(e.target.value)}
          >
            <option className="bg-dark" value="asc">
              Ascending
            </option>
            <option className="bg-dark" value="desc">
              Descending
            </option>
          </select>
        </div> */}
        <div>
          {gameReviews.length === 0 && (
            <p className="text-center text-white text-lg">
              There is no reviews yet.
            </p>
          )}
          {gameReviews.length > 0 && (
            <ReviewContent gameReviews={gameReviews} type={reviewSortType} />
          )}
        </div>
      </ul>
    </>
  );
};
