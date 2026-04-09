import { FC, useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { useGames } from "../../hooks";
import { Image } from "../../components";
import { HomeImageProps } from "../../types";

export const HomeImage: FC<HomeImageProps> = ({
  activeGameId,
  setActiveGameId,
}) => {
  const { useGameSlider } = useGames();
  const { gamesSlider } = useGameSlider();

  const heroMainSwiperRef = useRef<SwiperType | null>(null);

  const onHeroMainSlideChange = useCallback(
    (swiper: SwiperType) => {
      setActiveGameId(swiper.activeIndex);
    },
    [setActiveGameId],
  );

  useEffect(() => {
    const swiper = heroMainSwiperRef.current;
    if (!swiper) return;
    if (swiper.activeIndex === activeGameId) return;
    swiper.slideTo(activeGameId);
  }, [activeGameId]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        rewind
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          heroMainSwiperRef.current = swiper;
          setActiveGameId(swiper.activeIndex);
        }}
        onSlideChange={onHeroMainSlideChange}
        className="hero-home-swiper relative z-0 h-full min-h-[100dvh] w-full [&_.swiper-slide]:!h-full [&_.swiper-slide]:!w-full [&_.swiper-wrapper]:h-full [&_.swiper-wrapper]:w-full"
      >
        {gamesSlider.map((game) => (
          <SwiperSlide
            key={game.id}
            className="!box-border !h-full !w-full overflow-hidden"
          >
            <div className="relative h-full min-h-[100dvh] w-full [&_.lazy-load-image-background]:!absolute [&_.lazy-load-image-background]:!inset-0 [&_.lazy-load-image-background]:!block [&_.lazy-load-image-background]:!h-full [&_.lazy-load-image-background]:!w-full [&_.lazy-load-image-background]:!max-w-none [&_img]:!h-full [&_img]:!w-full [&_img]:!max-w-none [&_img]:!object-cover [&_img]:object-[center_20%]">
              <Image
                imgUrl={game.background_image}
                name={game.name}
                effect="opacity"
                styles="h-full min-h-[100dvh] w-full max-w-none object-cover object-[center_20%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 z-10 min-h-[100dvh] w-full bg-black/60" />
    </div>
  );
};
