import { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { classNames } from "../../../utils";
import { Button } from "../../../components";
import { LoginHelpButtonProps } from "../../../types";
import { emailOrPhoneButtonList, loginHelpFormData } from "../../../data";

export const LoginHelpButton: FC<LoginHelpButtonProps> = (props) => {
  const { selectedMethod, setSelectedMethod } = props;

  const location = useLocation();

  const { toFormName } = location.state || {};
  const { formDescription, emailText, smsText } = loginHelpFormData[toFormName];

  return (
    <>
      <p className="text-md">{formDescription}</p>
      <div className="flex_justify_center gap-4">
        {emailOrPhoneButtonList.map((item, index) => (
          <Fragment key={item.name}>
            <Button
              type="button"
              isSubmitting={false}
              variant="none"
              label={item.name}
              className={classNames(
                "w-full text-onNeutralBg text-sm border border-divider hover:text-primary hover:bg-primary-opacity",
                selectedMethod === item.label &&
                  "bg-primary-opacity text-primary"
              )}
              onClick={() => setSelectedMethod(item.label)}
            />

            {index < emailOrPhoneButtonList.length - 1 && (
              <span className="text-onNeutralBg text-sm">OR</span>
            )}
          </Fragment>
        ))}
      </div>
      <p className="text-md">
        {selectedMethod === "email" ? emailText : smsText}
      </p>
    </>
  );
};
