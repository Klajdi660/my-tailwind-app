import { FunctionComponent } from "react";
import { MediaCard } from "../Cards";
import { TitleSkeleton, MediaCardSkeleton } from "../Skeleton";
import { Title } from "../UI";
import { useStore } from "../../hooks";
import { MediaSectionProps } from "../../types";
import { classNames } from "../../utils";

const grid = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};

export const MediaSection: FunctionComponent<MediaSectionProps> = (props) => {
  const {
    enableTitle = true,
    type,
    gridNumber = 5,
    skeletonItemNumber = gridNumber * 2,
    title,
    subTitle,
    gameList,
  } = props;

  const { loading } = useStore();

  return (
    <>
      {loading ? (
        <div className="animate_skeleton">
          {enableTitle && <TitleSkeleton />}
          <div className={classNames("grid gap-4", grid?.[gridNumber])}>
            <MediaCardSkeleton number={skeletonItemNumber} type={type} />
          </div>
        </div>
      ) : (
        <section className="media_section">
          <div className="media_content">
            {enableTitle && <Title name={title} type={""} desc={subTitle} />}
            <div className={classNames("grid gap-4", grid?.[gridNumber])}>
              {gameList?.length &&
                gameList?.map((game: any) => (
                  <MediaCard key={game.id} game={game} type={type} />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
