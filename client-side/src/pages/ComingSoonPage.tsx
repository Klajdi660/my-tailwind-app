import { Link } from "react-router-dom";
import { FC } from "react";
import { paths } from "../data";

export const ComingSoonPage: FC = () => {
  const { DISCOVER } = paths;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary">Coming Soon!</h1>
        <p className="mt-2 text-2xl font-semibold text-onNeutralBg">
          The page you are looking for might be coming soon.
        </p>
        <div className="mt-6">
          <Link to={DISCOVER} className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};
