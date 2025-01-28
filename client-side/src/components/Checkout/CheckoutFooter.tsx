import { FC } from "react";
import { Icon } from "../../components";

export const CheckoutFooter: FC = () => {
  return (
    <div className="w-full flex-1 mt-2 md:mt-0 px-8 py-2 flex_justify_center flex-col">
      <div className="flex items-center justify-center gap-2">
        <Icon name="BsShieldLock" className="text-primary" />
        <p className="text-onNeutralBg">
          Secured by <span className="font-bold text-primary">BENSTACK</span>
        </p>
      </div>
    </div>
  );
};
