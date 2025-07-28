import { FC } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../hooks";
import { classNames } from "../utils";
import { serviceResponseMap } from "../data";
import { Icon } from "./UI/Icon";

interface ServiceResponseProps {
  resendCodeHandler?: () => void;
}

export const ServiceResponse: FC<ServiceResponseProps> = (props) => {
  const { resendCodeHandler } = props;

  const { serviceResponse, setServiceResponse } = useStore();

  const {
    serviceError,
    serviceMessageName,
    serviceMessage = "",
  } = serviceResponse;
  const serviceConfig = serviceResponseMap[serviceMessageName || ""];

  const renderServiceResponseWithLink = () => {
    if (!serviceConfig) return <p>{serviceMessage}</p>;

    const { linkText, to, state } = serviceConfig;
    const [beforeLink, afterLink] = serviceMessage.split(
      new RegExp(linkText, "i")
    );

    return (
      <p>
        {beforeLink}
        {to ? (
          <Link to={to} state={state} onClick={() => setServiceResponse({})}>
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
    <div
      className={classNames(
        "w-full flex_justify_start gap-2 p-4 rounded",
        serviceError ? "bg-red-200" : "bg-green-500/20"
        // bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80
      )}
    >
      <div>
        <Icon
          name={serviceError ? "AiOutlineWarning" : "MdOutlineCheckCircle"}
          size={25}
        />
      </div>

      {renderServiceResponseWithLink()}
    </div>
  );
};
