import { FC } from "react";
import { useGames } from "../../hooks";
import { Footer } from "../../components";
import { HeroModule, TrendingModule } from "../../modules";

export const HomePage: FC = () => {
  const { useGameSlider } = useGames();
  const { gamesSlider, isSliderPending } = useGameSlider();

  if (isSliderPending || gamesSlider.length === 0) return null;

  return (
    <section className="home_section flex flex-col gap-10">
      <HeroModule />
      <section className="px-4 sm:px-10 md:px-40">
        <TrendingModule />
        <Footer />
      </section>
    </section>
  );
};
