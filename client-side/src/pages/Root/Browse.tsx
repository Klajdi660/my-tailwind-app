import { FC } from "react";
import { MediaSection, Button, Title, Icon } from "../../components";
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
        <div className="flex_justify_between">
          <Title name="Game Genres" type="large" divider={false} />
          <div className="flex gap-20">
            <div className="flex gap-6">
              <div className="flex_justify_center gap-2">
                Platforms
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Genres
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Name
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Relevance
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Popularity
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Rating
                <Icon name="MdOutlineSort" />
              </div>
              <div className="flex_justify_center gap-2">
                Release date
                <Icon name="MdOutlineSort" />
              </div>
            </div>
            <div className="flex_justify_center gap-2">
              New
              <Icon name="LuArrowDownUp" />
            </div>
          </div>
        </div>
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
