import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { paths } from "../constants";

interface ComingSoonProps {}

const ComingSoon: FunctionComponent<ComingSoonProps> = () => {
  const { discover } = paths;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary">Coming Soon!</h1>
        <p className="mt-2 text-2xl font-semibold text-onNeutralBg">
          The page you are looking for might be coming soon.
        </p>
        <div className="mt-6">
          <Link to={discover} className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;