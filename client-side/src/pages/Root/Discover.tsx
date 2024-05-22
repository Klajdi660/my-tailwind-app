import { FunctionComponent } from "react";
import { DiscoverPageProps } from "../../types";

const Discover: FunctionComponent<DiscoverPageProps> = () => {
  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        <h1 className="text-onNeutralBg">Discover Page</h1>
      </div>
    </section>
  );
};

export default Discover;
