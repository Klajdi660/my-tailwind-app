import { FC } from "react";
import { Icon } from "../../components";
import { ErrorFormMessageProps } from "../../types";

export const ErrorFormMessage: FC<ErrorFormMessageProps> = ({
  errorMessage,
}) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
      {message && (
        <p className="text-xs text-red-500 flex flex-row items-center mt-2">
          <Icon
            // name="PiWarningCircleBold"
            name="IoCloseCircleOutline"
            size={18}
            className="mr-1 text-red-500"
          />
          {message}
        </p>
      )}
    </>
  );
};
