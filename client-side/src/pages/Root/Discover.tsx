import { FunctionComponent } from "react";
import { useAuth } from "../../hooks";
interface DiscoverProps {}

const Discover: FunctionComponent<DiscoverProps> = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated 222:>> ", isAuthenticated);
  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        <h1 className="text-onNeutralBg">Discover Page</h1>
      </div>
    </section>
  );
};

export default Discover;
