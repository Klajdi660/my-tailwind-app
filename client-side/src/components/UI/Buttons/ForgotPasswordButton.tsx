import { FC, Fragment } from "react";
import { Button } from "../Button";
import { classNames } from "../../../utils";
import { forgotPasswordButtonList } from "../../../data";

interface ForgotPasswordButtonProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export const ForgotPasswordButton: FC<ForgotPasswordButtonProps> = (props) => {
  const { selectedMethod, setSelectedMethod } = props;

  return (
    <div className="flex_justify_center gap-4">
      {forgotPasswordButtonList.map((item, index) => (
        <Fragment key={item.name}>
          <Button
            type="button"
            variant="none"
            label={item.name}
            className={classNames(
              "w-full text-onNeutralBg text-sm border border-divider hover:text-primary hover:bg-primary-opacity",
              selectedMethod === item.label && "bg-primary-opacity text-primary"
            )}
            onClick={() => setSelectedMethod(item.label)}
          />

          {index < forgotPasswordButtonList.length - 1 && (
            <span className="text-onNeutralBg text-sm">OR</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
