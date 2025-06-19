import { FC, Fragment } from "react";
import { registerButtonList } from "../../../data";
import { classNames } from "../../../utils";
import { Button } from "../Button";

interface RegisterButtonProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export const RegisterButton: FC<RegisterButtonProps> = (props) => {
  const { selectedMethod, setSelectedMethod } = props;

  return (
    <div className="flex_justify_center gap-4">
      {registerButtonList.map((item, index) => (
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

          {index < registerButtonList.length - 1 && (
            <span className="text-onNeutralBg text-sm">OR</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
