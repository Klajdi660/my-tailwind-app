import { FC } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useFetchGame } from "../../lib";
import { BrowsePageProps } from "../../types";
import { MediaSection, Button } from "../../components";
// import { useGamesService } from "../../services";
import { useGames, useScrollPosition } from "../../hooks";
import { classNames } from "../../utils";

export const BrowsePage: FC<BrowsePageProps> = () => {
  const isShowScrollUpBtn = useScrollPosition();

  // const { getGameList } = useGamesService();
  // const [isShowScrollUpBtn, setIsShowScrollUpBtn] = useState(false);

  // const queryOptions = {
  //   queryKey: ["discover"],
  //   // queryKey: ["topPlay", values],
  //   queryFn: () => getGameList({ page: 1, pageSize: 20 }),
  // };

  // const { data: gameList } = useQuery(queryOptions);

  // const { gameList } = useFetchGame({
  //   page: 1,
  //   pageSize: 20,
  //   gameKey: "discover",
  // });

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
      <div className="browse_page flex flex-col">
        <MediaSection
          type="playlist"
          title="Discover"
          // gameList={gameList}
          skeletonItemNumber={5}
          subTitle="Explore sonic realms with our Discover feature."
        />
      </div>
    </>
  );
};
