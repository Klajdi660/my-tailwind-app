import { FunctionComponent } from "react";
import { Image } from "../UI";
import { emptyCart } from "../../assets";

interface CartEmptyPorps {}

export const CartEmpty: FunctionComponent<CartEmptyPorps> = () => {
  return (
    <div className="w-full p-5 flex flex-col items-center gap-4 justify-center">
      <Image imgUrl={emptyCart} name="empty_cart" styles="h-[340px]" />
      <p className="text-textColor  font-semibold">Cart is empty</p>
    </div>
  );
};
