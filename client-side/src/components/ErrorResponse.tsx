import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { errorAuthResponseMap } from "../data";

export const ErrorResponse: FC = () => {
  const { errorTypeResponse, errorResponseMessage } = useAuth();

  const errorConfig = errorAuthResponseMap[errorTypeResponse || ""];

  const renderErrorWithLink = () => {
    if (!errorConfig) return <p>{errorResponseMessage}</p>;

    const { linkText, to, state } = errorConfig;
    const [beforeLink, afterLink] = errorResponseMessage.split(
      new RegExp(linkText, "i")
    );

    return (
      <p>
        {beforeLink}
        <Link to={to} state={state}>
          <span className="underline hover:text-primary">{linkText}</span>
        </Link>
        {afterLink}
      </p>
    );
  };

  return (
    <div className="w-full bg-red-200 rounded bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 p-4">
      {renderErrorWithLink()}
    </div>
  );
};
