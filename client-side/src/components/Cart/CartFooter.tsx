import { FunctionComponent } from "react";
import { Button } from "../UI";
import { CartFooterProps } from "../../types";
import { calculateTotalPrice } from "../../utils";

export const CartFooter: FunctionComponent<CartFooterProps> = (props) => {
  const { setCheckoutOpen, cartItems, quantities } = props;

  const { subTotalPrice, shipping, totalPrice } = calculateTotalPrice(
    cartItems,
    quantities
  );

  // absolute bottom-0

  return (
    <div className="switch_footer flex_justify_between flex-col p-4  w-full gap-3 bg-switch">
      <div className="w-full flex items-center justify-between text-base md:text-lg text-secondary">
        <p>Sub Total</p>
        <p>
          <span className="text-sm text-red-600">₵</span> {subTotalPrice}
        </p>
      </div>
      <div className="w-full flex items-center text-base md:text-lg text-secondary justify-between">
        <p>Shipping</p>
        <p>
          <span className="text-sm text-red-600">₵</span> {shipping}
        </p>
      </div>
      <div className="w-full border-b border-divider"></div>
      <div className="w-full flex items-center text-base md:text-lg text-onNeutralBg justify-between">
        <p className="uppercase">Total</p>
        <p>
          <span className="text-sm text-red-600">₵</span> {totalPrice}
        </p>
      </div>
      <div className="group mt-2 w-full flex_justify_center">
        <Button
          label={`Checkout $${totalPrice}`}
          variant="none"
          labelIcon="CiShoppingTag"
          className="w-[80%] bg-primary rounded-full text-white group-hover:opacity-70"
          iconClassName="text-white"
          onClick={() => setCheckoutOpen(true)}
        />
      </div>
    </div>
  );
};
