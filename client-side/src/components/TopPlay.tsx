import { FunctionComponent } from "react";
import { classNames } from "../utils";
import { Footer } from "./Footer";

interface TopPlayProps {}

export const TopPlay: FunctionComponent<TopPlayProps> = (props) => {
  return (
    <section
      className={classNames(
        "top_picks_section xl:fixed top-0 xl:h-screen xl:w-aside min-w-aside hidden-0 relative main_width xl:left-auto mb-[100px] xl:mb-0 h-auto p-3 sm:p-6 xl:p-0 xl:block right-0 overflow-auto"
      )}
    >
      <div className="w-full h-full bg-switch">
        <div className="sticky top-0 p-4 rounded bg-switch xl:rounded-none">
          <div className="top_picks_content"></div>
          <Footer />
        </div>
      </div>
    </section>
  );
};
