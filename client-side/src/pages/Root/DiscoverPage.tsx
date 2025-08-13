import { FC } from "react";
import { getDataPeriod } from "../../utils";
import { GamesSwiper } from "../../components";

export const DiscoverPage: FC = () => {
  const { currentDate, lastYear } = getDataPeriod();

  // flex flex-col gap-6

  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-6">
        <GamesSwiper
          sectionName="genre_swiper_section"
          titleName="Game Genres"
          swiperType="genre"
        />
        <GamesSwiper
          sectionName="popular_swiper_section"
          titleName="Popular Games"
          dateParam={`${lastYear},${currentDate}`}
          orderingParam="-metacritic"
        />
        <GamesSwiper
          sectionName="topRated_swiper_section"
          titleName="Top Rated Games"
          dateParam={`${lastYear},${currentDate}`}
          orderingParam="-rating"
        />
      </div>
    </section>
  );
};
