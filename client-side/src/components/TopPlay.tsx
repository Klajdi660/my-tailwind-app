import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "./Footer";
import { TopPlaySection } from "./Sections";
import { TopPlayProps } from "../types";
import { useGamesService } from "../services";
import { classNames, useHiddenTopPlay } from "../utils";

export const TopPlay: FunctionComponent<TopPlayProps> = (props) => {
  // const { getGameList } = useGamesService();
  // const hiddenTopPlay = useHiddenTopPlay();

  // const queryOptions = {
  //   queryKey: ["topPlay"],
  //   // queryKey: ["topPlay", values],
  //   queryFn: () => getGameList({ page: 1, pageSize: 5 }),
  // };

  // const { data: gameList } = useQuery(queryOptions);

  return (
    <section
      className={classNames(
        "top_picks_section xl:fixed top-0 xl:h-screen xl:w-aside min-w-aside hidden-0 relative main_width xl:left-auto mb-[100px] xl:mb-0 h-auto p-3 sm:p-6 xl:p-0 xl:block right-0 overflow-auto flex flex-col"
      )}
    >
      <div className="w-full h-full flex flex-col bg-switch">
        <div className="flex-grow">
          <div className="sticky top-0 p-4 rounded bg-switch xl:rounded-none">
            {/* {hiddenTopPlay && (
              <div className="top_picks_content">
                <TopPlaySection gameList={gameList} imageDims="11" />
              </div>
            )} */}
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};
