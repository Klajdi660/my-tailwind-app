import { FC } from "react";
import { MediaSection, Button, GameFilter } from "../../components";
import { useScrollPosition } from "../../hooks";

export const BrowsePage: FC = () => {
  const isShowScrollUpBtn = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isShowScrollUpBtn && (
        <div className="group">
          <Button
            iconClassName="group-hover:text-white"
            variant="none"
            labelIcon="RiArrowUpLine"
            size={22}
            onClick={scrollToTop}
            className="fixed bottom-40 right-60 z-50 py-4 rounded-full bg-primary-opacity group-hover:bg-primary"
          />
        </div>
      )}
      <div className="browse_page flex flex-col gap-4">
        <GameFilter />
        <MediaSection
          type="album"
          title="Discover"
          skeletonItemNumber={5}
          subTitle="Explore sonic realms with our Discover feature."
        />
      </div>
    </>
  );
};
