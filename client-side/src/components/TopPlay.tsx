// import { FunctionComponent } from "react";
// import { Footer } from "./Footer";
// import { TopPlayProps } from "../types";
// import { classNames } from "../utils";

// export const TopPlay: FunctionComponent<TopPlayProps> = (props) => {
//   return (
//     <section
//       className={classNames(
//         "top_pvalues: any, p0: numbern xl:fixed top-0 xl:h-screen xl:w-aside min-w-aside hidden-0 relative main_width xl:left-auto mb-[100px] xl:mb-0 h-auto p-3 sm:p-6 xl:p-0 xl:block right-0 overflow-auto"
//       )}
//     >
//       <div className="w-full h-full bg-switch">
//         <div className="sticky top-0 p-4 rounded bg-switch xl:rounded-none">
//           <div className="top_picks_content"></div>
//           <Footer />
//         </div>
//       </div>
//     </section>
//   );
// };

import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { TopPlaySection } from "./Sections";
import { Footer } from "./Footer";
import { useGamesService } from "../services";
import { TopPlayProps } from "../types";
import { classNames } from "../utils";

export const TopPlay: FunctionComponent<TopPlayProps> = (props) => {
  const { getGamesList } = useGamesService();

  const values = { page: 1, pageSize: 8 };

  const queryOptions = {
    queryKey: ["topPlay"],
    // queryKey: ["topPlay", values],
    queryFn: () => getGamesList(values),
  };

  const { data } = useQuery(queryOptions);

  return (
    <section
      className={classNames(
        "top_picks_section xl:fixed top-0 xl:h-screen xl:w-aside min-w-aside hidden-0 relative main_width xl:left-auto mb-[100px] xl:mb-0 h-auto p-3 sm:p-6 xl:p-0 xl:block right-0 overflow-auto flex flex-col"
      )}
    >
      <div className="w-full h-full bg-switch flex flex-col">
        <div className="flex-grow">
          <div className="sticky top-0 p-4 rounded bg-switch xl:rounded-none">
            <div className="top_picks_content">
              <TopPlaySection gameList={data} imageDims="11" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};
