import { FC, useRef, useState } from "react";
import { DiscoverPageProps } from "../../types";
import { GameGenreList, Title } from "../../components";
import { useGameHook } from "../../hooks";
import { Icon } from "../../components/UI";
import { classNames } from "../../utils";

export const DiscoverPage: FC<DiscoverPageProps> = () => {
  const { useGameGenreList } = useGameHook();

  const { gameGenreList } = useGameGenreList();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!gameGenreList) return;

  return (
    <section className="discover_page flex flex-col gap-6">
      <div className="discover_genre_section">
        <div className="flex_justify_between">
          <Title name="Game Genres" type="large" divider={false} />
          <div className="flex gap-2">
            <button
              ref={prevRef}
              disabled={isBeginning}
              type="button"
              className={classNames(
                "w-8 h-8 flex_justify_center transition-colors duration-500 rounded-full group",
                isBeginning ? "bg-gray-200" : "bg-card hover:bg-primary"
              )}
            >
              <Icon
                name="MdKeyboardArrowLeft"
                className={classNames(
                  isBeginning ? "!text-gray-400" : "group-hover:!text-white"
                )}
              />
            </button>
            <button
              ref={nextRef}
              disabled={isEnd}
              type="button"
              className={classNames(
                "w-8 h-8 flex_justify_center transition-colors duration-500 rounded-full group",
                isEnd ? "bg-gray-200" : "bg-card hover:bg-primary"
              )}
            >
              <Icon
                name="MdKeyboardArrowRight"
                className={classNames(
                  isEnd ? "!text-gray-400" : "group-hover:!text-white"
                )}
              />
            </button>
          </div>
        </div>
        <GameGenreList
          gameGenres={gameGenreList}
          prevRef={prevRef}
          nextRef={nextRef}
          setIsBeginning={setIsBeginning}
          setIsEnd={setIsEnd}
        />
      </div>
      <section className="genre_section">
        <div className="relative z-20 flex flex-col gap-10"></div>
      </section>
    </section>
  );
};
