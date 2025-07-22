import { FC, Fragment } from "react";
import { Button } from "../Button";
import { classNames } from "../../../utils";
import { emailOrPhoneButtonList } from "../../../data";
import { EmailOrPhoneButtonProps } from "../../../types";

export const EmailOrPhoneButton: FC<EmailOrPhoneButtonProps> = (props) => {
  const { selectedMethod, setSelectedMethod } = props;

  return (
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
              selectedMethod === item.label && "bg-primary-opacity text-primary"
            )}
            onClick={() => setSelectedMethod(item.label)}
          />

          {index < emailOrPhoneButtonList.length - 1 && (
            <span className="text-onNeutralBg text-sm">OR</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
