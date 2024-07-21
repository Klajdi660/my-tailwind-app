import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowsePageProps } from "../../types";
import { useGamesService } from "../../services";
import { MediaSection } from "../../components";

export const BrowsePage: FunctionComponent<BrowsePageProps> = () => {
  const { getGameList } = useGamesService();

  const queryOptions = {
    queryKey: ["topPlay"],
    // queryKey: ["topPlay", values],
    queryFn: () => getGameList({ page: 1, pageSize: 5 }),
  };

  const { data: gameList } = useQuery(queryOptions);

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
