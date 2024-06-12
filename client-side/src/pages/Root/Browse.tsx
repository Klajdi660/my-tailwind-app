import { FunctionComponent } from "react";
import { BrowsePageProps } from "../../types";

export const BrowsePage: FunctionComponent<BrowsePageProps> = () => {
  return (
    <section className="browse_page">
      <div className="relative gap-6">
        <h1 className="text-onNeutralBg">Browse Page</h1>
      </div>
    </section>
  );
};

export default BrowsePage;
