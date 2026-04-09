import { FC, useState } from "react";
import { useGames } from "../../hooks";
import { HeroModule, TrendingModule } from "../../modules";
import { Footer, HomeHeader, HomeImage } from "../../components";

export const HomePage: FC = () => {
  const { useGameSlider } = useGames();
  const { gamesSlider, isSliderPending } = useGameSlider();

  const [activeGameId, setActiveGameId] = useState(0);

  if (isSliderPending || gamesSlider.length === 0) return null;

  return (
    <section className="home_section relative flex flex-col min-h-dvh overflow-hidden">
      <HomeImage
        activeGameId={activeGameId}
        setActiveGameId={setActiveGameId}
      />
      <div className="relative z-10 flex min-h-[100dvh] flex-col px-4 pb-8 pt-4 sm:px-10 sm:pt-6 md:px-40">
        <HomeHeader />
        <HeroModule
          activeGameId={activeGameId}
          setActiveGameId={setActiveGameId}
        />
      </div>
      <div className="px-4 sm:px-10 md:px-40 bg-black pt-10">
        <TrendingModule />
        <Footer />
      </div>
    </section>
  );
};
