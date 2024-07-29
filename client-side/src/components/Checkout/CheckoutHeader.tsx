import { FunctionComponent } from "react";
import { Icon } from "../UI";

interface CheckoutHeaderPorps {
  closeCheckoutHandler: any;
}

export const CheckoutHeader: FunctionComponent<CheckoutHeaderPorps> = (
  props
) => {
  const { closeCheckoutHandler } = props;
  return (
    <div className="w-full flex_justify_between px-2 py-4 h-navbar cursor-pointer">
      <Icon
        name="GoArrowLeft"
        className="hover:text-primary"
        onClick={closeCheckoutHandler}
      />
      <h5 className="text-base font-semibold">Secured Payment</h5>
      <div className="flex gap-2">
        <Icon name="BsShieldLock" className="text-primary" />
        <Icon name="RiSecurePaymentLine" className="text-primary" />
      </div>
    </div>
  );
};
