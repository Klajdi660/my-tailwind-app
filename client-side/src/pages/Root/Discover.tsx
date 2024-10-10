import { FC } from "react";
import { DiscoverPageProps } from "../../types";
import { GameGenreList } from "../../components";
import { useGameHook } from "../../hooks";

export const DiscoverPage: FC<DiscoverPageProps> = () => {
  const { useGameGenreList } = useGameHook();

  const { gameGenreList } = useGameGenreList();

  if (!gameGenreList) return;

  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        <section className="discover-content flex flex-col gap-6">
          <div className="w-full flex_justify_between flex-col h-[250px]">
            <div className="flex_justify_between flex-row bg-switch w-full h-full rounded-3xl p-4">
              <div>Discover Page</div>
            </div>
          </div>
          <GameGenreList gameGenres={gameGenreList} />
        </section>
      </div>
    </section>
  );
};
