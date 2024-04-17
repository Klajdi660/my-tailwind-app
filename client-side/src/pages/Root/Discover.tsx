import { FunctionComponent } from "react";

interface DiscoverProps {}

const Discover: FunctionComponent<DiscoverProps> = () => {
  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        <h1 className="text-onNeutralBg">Discover Page</h1>
      </div>
    </section>
  );
};

export default Discover;
