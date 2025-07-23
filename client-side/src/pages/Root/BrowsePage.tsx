import { FC } from "react";
import { useScrollPosition } from "../../hooks";
import { BrowseFilter, Icon, MediaSection } from "../../components";

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
        <button
          className="flex_justify_center w-10 h-10 fixed bottom-6 right-6 bg-card hover:bg-primary z-50 rounded-full shadow-lg animate-bounce group"
          onClick={scrollToTop}
        >
          <Icon name="MdKeyboardArrowUp" className="group-hover:text-white" />
        </button>
      )}
      <div className="browse_page flex flex-col gap-4">
        <BrowseFilter />
        <MediaSection
          title="Discover"
          subTitle="Explore sonic realms with our Discover feature."
          skeletonItemNumber={5}
        />
      </div>
    </>
  );
};
