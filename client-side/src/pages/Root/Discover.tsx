import { FC } from "react";
import { DiscoverPageProps } from "../../types";
import { GameGenreList, Title } from "../../components";
import { useGameHook } from "../../hooks";
import { Icon } from "../../components/UI";

export const DiscoverPage: FC<DiscoverPageProps> = () => {
  const { useGameGenreList } = useGameHook();

  const { gameGenreList } = useGameGenreList();

  if (!gameGenreList) return;

  return (
    <section className="discover_page flex flex-col gap-6">
      <div className="discover_genre_section">
        <div className="flex_justify_between">
          <Title name="Game Genres" type="large" divider={false} />
          <div className="flex gap-2">
            <button
              type="button"
              className="w-8 h-8 flex_justify_center transition-colors duration-500 bg-card rounded-full hover:bg-primary group"
            >
              <Icon
                name="MdKeyboardArrowLeft"
                className="group-hover:!text-white"
              />
            </button>
            <button
              type="button"
              className="w-8 h-8 flex_justify_center transition-colors duration-500 bg-card rounded-full hover:bg-primary group"
            >
              <Icon
                name="MdKeyboardArrowRight"
                className="group-hover:!text-white"
              />
            </button>
          </div>
        </div>
        <GameGenreList gameGenres={gameGenreList} />
      </div>
      <section className="genre_section">
        <div className="relative z-20 flex flex-col gap-10"></div>
      </section>
    </section>
  );
};
