import { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "../data";

export const ComingSoonPage: FC = () => {
  const { DISCOVER } = paths;

  return (
    <div className="h-screen flex_justify_center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary">Coming Soon!</h1>
        <p className="mt-2 text-2xl font-semibold text-onNeutralBg">
          The page you are looking for might be coming soon.
        </p>
        <div className="mt-6">
          <Link to={DISCOVER} className="text-primary hover:underline">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};
