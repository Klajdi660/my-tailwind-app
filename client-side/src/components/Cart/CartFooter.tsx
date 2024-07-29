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

  return (
    <div className="w-full mt-2 md:mt-0 flex-1 rounded bg-primary-opacity rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly">
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
