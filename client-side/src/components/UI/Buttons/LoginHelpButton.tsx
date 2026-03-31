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
      <div className="flex_justify_start flex-col gap-4">
        {emailOrPhoneButtonList.map((item) => (
          <Button
            key={item.name}
            type="button"
            isSubmitting={false}
            variant="none"
            label={item.label}
            labelIcon={
              selectedMethod === item.name ? "FaDotCircle" : "FaRegCircle"
            }
            className={classNames(
              "w-full flex text-onNeutralBg text-sm border border-divider hover:text-primary hover:bg-primary-opacity",
              selectedMethod === item.name && "bg-primary-opacity text-primary",
            )}
            onClick={() => setSelectedMethod(item.name)}
          />
        ))}
      </div>
      <p className="text-md">
        {selectedMethod === "email" ? emailText : smsText}
      </p>
    </>
  );
};
