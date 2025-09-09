import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { grid } from "../../data";
import { useGames } from "../../hooks";
import { classNames } from "../../utils";
import { MediaSectionProps } from "../../types";
import { MediaCard, MediaCardSkeleton, TitleSkeleton } from "../../components";

export const MediaSection: FC<MediaSectionProps> = (props) => {
  const {
    enableTitle = true,
    gridNumber = 5,
    skeletonItemNumber = gridNumber * 2,
  } = props;

  const [parent] = useAutoAnimate();
  const { useGameList } = useGames();

  const [searchParams] = useSearchParams();

  const params = {
    genres: searchParams.get("genreId") || undefined,
    parent_platforms: searchParams.get("platformId") || undefined,
  };

  const { gameList, isLoading, fetchNextPage, hasNextPage } =
    useGameList(params);

  if (!gameList) return;

  const dataLength = gameList.reduce(
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
              <MediaCardSkeleton number={skeletonItemNumber} />
            </div>
          </div>
        )}
        {gameList &&
          gameList.map((page, index) => {
            return (
              <div
                ref={parent}
                key={index}
                className={classNames("grid gap-4 mb-4", grid?.[gridNumber])}
              >
                {page.results.map((game) => (
                  <MediaCard key={game.id} game={game} />
                ))}
              </div>
            );
          })}
      </InfiniteScroll>
    </>
  );
};
