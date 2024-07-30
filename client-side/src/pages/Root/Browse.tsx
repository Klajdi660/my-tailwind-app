import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowsePageProps } from "../../types";
import { useGamesService } from "../../services";
import { MediaSection } from "../../components";
import { useFetchGame } from "../../lib";

export const BrowsePage: FunctionComponent<BrowsePageProps> = () => {
  // const { getGameList } = useGamesService();

  // const queryOptions = {
  //   queryKey: ["discover"],
  //   // queryKey: ["topPlay", values],
  //   queryFn: () => getGameList({ page: 1, pageSize: 20 }),
  // };

  // const { data: gameList } = useQuery(queryOptions);

  const { gameList } = useFetchGame({
    page: 1,
    pageSize: 20,
    gameKey: "discover",
  });

  return (
    <section className="browse_page">
      <div className="flex flex-col gap-y-16">
        <MediaSection
          type="playlist"
          title="Discover"
          gameList={gameList}
          skeletonItemNumber={5}
          subTitle="Explore sonic realms with our Discover feature."
        />
      </div>
    </section>
  );
};

export default BrowsePage;
