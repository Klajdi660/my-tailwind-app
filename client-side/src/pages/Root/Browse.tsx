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
    gameKey: "discover",
    page: 1,
    pageSize: 20,
  });

  return (
    <section className="browse_page">
      <div className="flex flex-col gap-y-16">
        <MediaSection
          gameList={gameList}
          title="Discover"
          subTitle="Explore sonic realms with our Discover feature."
          type="playlist"
          skeletonItemNumber={5}
        />
      </div>
    </section>
  );
};

export default BrowsePage;
