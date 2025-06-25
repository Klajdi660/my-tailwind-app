import { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../data";

interface FormRedirectProps {
  formName: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
}

export const FormRedirect: FC<FormRedirectProps> = (props) => {
  const { formName, footerTitle, footerLink, linkTo } = props;

  const { FORGOT_PASSWORD } = paths;

  return (
    <div className="flex flex-col gap-4">
      {formName === "login" && (
        <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
          Forgot Password?
          <Link to={FORGOT_PASSWORD}>
            <p className="text-primary hover:underline underline-offset-2">
              Reset
            </p>
          </Link>
        </div>
      )}
      <div className="flex_justify_center gap-2 text-sm text-onNeutralBg">
        {footerTitle}
        <Link to={linkTo}>
          <p className="text-primary hover:underline underline-offset-2">
            {footerLink}
          </p>
        </Link>
      </div>
    </div>
  );
};
