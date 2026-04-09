import { FC, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { useGames } from "../../hooks";
import { Image } from "../../components";
import { HomeImageProps } from "../../types";

export const HomeImage: FC<HomeImageProps> = ({ setActiveGameId }) => {
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const heroMainSwiperRef = useRef<SwiperType | null>(null);

  const onHeroMainSlideChange = useCallback(
    (swiper: SwiperType) => {
      setActiveGameId(swiper.activeIndex);
    },
    [setActiveGameId],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 isolate z-0 min-h-[100dvh]"
      aria-hidden
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        rewind
        speed={1000}
        onSwiper={(swiper) => {
          heroMainSwiperRef.current = swiper;
          setActiveGameId(swiper.activeIndex);
        }}
        onSlideChange={onHeroMainSlideChange}
        className="hero-home-swiper relative z-0 h-full min-h-[100dvh] w-full [&_.swiper-slide]:!h-full"
      >
        {gamesSlider.map((game) => (
          <SwiperSlide key={game.id}>
            <Image
              imgUrl={game.background_image}
              name={game.name}
              effect="opacity"
              styles="h-full min-h-[100dvh] w-full object-cover object-[center_20%]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 z-10 min-h-[100dvh] w-full bg-black/60" />
    </div>
  );
};
