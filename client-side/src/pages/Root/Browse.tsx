import { FunctionComponent } from "react";

interface BrowseProps {}

const Browse: FunctionComponent<BrowseProps> = () => {
  return (
    <section className="browse_page">
      <div className="relative gap-6">
        <h1 className="text-onNeutralBg">Browse Page</h1>
      </div>
    </section>
  );
};

export default Browse;
