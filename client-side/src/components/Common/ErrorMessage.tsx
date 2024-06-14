import { FunctionComponent } from "react";
import { Icon } from "../UI";
import { ErrorMessageProps } from "../../types";

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  errorMessage,
}) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
      {message && (
        <p className="text-xs text-red-500 flex flex-row items-center mt-2">
          <Icon
            name="PiWarningCircleBold"
            size={18}
            className="mr-1 text-red-500"
          />
          {message}
        </p>
      )}
    </>
  );
};
