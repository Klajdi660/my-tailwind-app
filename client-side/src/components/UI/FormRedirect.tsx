import { FC } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../hooks";
import { FormRedirectProps } from "../../types";

export const FormRedirect: FC<FormRedirectProps> = (props) => {
  const {
    toFormName,
    footerTitle,
    footerLink,
    linkTo,
    otherLink,
    resendCodeHandler,
  } = props;

  const { setErrorResponse } = useStore();

  const { otherLinkName, otherLinkTo, otherLinkPName } = otherLink || {};

  return (
    <div className="flex flex-col gap-4">
      {otherLink && (
        <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
          {otherLinkName}
          <Link
            to={otherLinkTo || ""}
            state={{ toFormName }}
            onClick={(e) => {
              setErrorResponse({});
              if (resendCodeHandler) {
                e.preventDefault();
                resendCodeHandler();
              }
            }}
          >
            <p className="text-primary hover:underline underline-offset-2 cursor-pointer">
              {otherLinkPName}
            </p>
          </Link>
        </div>
      )}
      <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
        {footerTitle}
        <Link
          to={linkTo}
          onClick={() => {
            setErrorResponse({});
          }}
        >
          <p className="text-primary hover:underline underline-offset-2">
            {footerLink}
          </p>
        </Link>
      </div>
    </div>
  );
};
