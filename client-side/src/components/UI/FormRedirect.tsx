import { FC } from "react";
import { Link, To } from "react-router-dom";
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

  const { setServiceResponse } = useStore();

  const { otherLinkName, otherLinkTo, otherLinkPName } = otherLink || {};

  return (
    <div className="flex flex-col gap-4">
      {otherLink && (
        <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
          {otherLinkName}
          {toFormName &&
          ["reset-password", "verify-account"].includes(toFormName) ? (
            <p
              className="text-primary hover:underline underline-offset-2 cursor-pointer"
              onClick={resendCodeHandler}
            >
              {otherLinkPName}
            </p>
          ) : (
            <Link
              to={otherLinkTo as To}
              state={{ toFormName }}
              // onClick={(e) => {
              //   setServiceResponse({});
              //   if (resendCodeHandler) {
              //     e.preventDefault();
              //     resendCodeHandler();
              //   }
              // }}
            >
              <p className="text-primary hover:underline underline-offset-2 cursor-pointer">
                {otherLinkPName}
              </p>
            </Link>
          )}
        </div>
      )}
      <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
        {footerTitle}
        <Link
          to={linkTo}
          onClick={() => {
            setServiceResponse({});
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
