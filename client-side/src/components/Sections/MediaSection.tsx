import { FC } from "react";
import { MediaCard } from "../Cards";
import { classNames } from "../../utils";
import { MediaSectionProps } from "../../types";
import { TitleSkeleton, MediaCardSkeleton } from "../Skeleton";
import { useGames } from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Skeleton } from "../Common/Skeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const grid = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};

export const MediaSection: FC<MediaSectionProps> = (props) => {
  const {
    enableTitle = true,
    type,
    gridNumber = 5,
    skeletonItemNumber = gridNumber * 2,
    title,
    subTitle,
  } = props;
  const [parent] = useAutoAnimate();

  const { gameList, isLoading, fetchNextPage, hasNextPage } = useGames();
  if (!gameList) return;

  const dataLength = gameList.pages.reduce(
    (total, page) => total + page.results.length,
    0
  );

  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        endMessage={<></>}
      >
        {isLoading && (
          <div className="animate_skeleton">
            {enableTitle && <TitleSkeleton />}
            <div className={classNames("grid gap-4", grid?.[gridNumber])}>
              <MediaCardSkeleton number={skeletonItemNumber} type={type} />
            </div>
          </div>
        )}
        {gameList.pages &&
          gameList.pages.map((page, index) => {
            return (
              <div
                ref={parent}
                key={index}
                className={classNames("grid gap-4 mb-4", grid?.[gridNumber])}
              >
                {page.results.map((game) => (
                  <MediaCard key={game.id} game={game} type={type} />
                ))}
              </div>
            );
          })}
        {/* {!gameList.pages &&
          [...new Array(15)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-0 pb-[160%]" />
            </li>
          ))} */}
      </InfiniteScroll>
    </>
  );
};
