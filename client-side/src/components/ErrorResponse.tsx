import { FC } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../hooks";
import { errorAuthResponseMap } from "../data";

interface ErrorResponseProps {
  resendCodeHandler?: () => void;
}

export const ErrorResponse: FC<ErrorResponseProps> = (props) => {
  const { resendCodeHandler } = props;

  const { errorResponse, setErrorResponse } = useStore();

  const { errorType, errorMessage = "" } = errorResponse;
  const errorConfig = errorAuthResponseMap[errorType || ""];

  const renderErrorWithLink = () => {
    if (!errorConfig) return <p>{errorMessage}</p>;

    const { linkText, to, state } = errorConfig;
    const [beforeLink, afterLink] = errorMessage.split(
      new RegExp(linkText, "i")
    );

    return (
      <p>
        {beforeLink}
        {to ? (
          <Link to={to} state={state} onClick={() => setErrorResponse({})}>
            <span className="underline hover:text-primary">{linkText}</span>
          </Link>
        ) : (
          <span
            className="underline cursor-pointer hover:text-primary"
            onClick={resendCodeHandler}
          >
            {linkText}
          </span>
        )}
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
