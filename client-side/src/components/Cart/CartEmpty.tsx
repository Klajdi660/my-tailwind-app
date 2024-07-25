import { FunctionComponent } from "react";
import { Image, Icon } from "../UI";
import { emptyCart } from "../../assets";
import { CartEmptyPorps } from "../../types";

export const CartEmpty: FunctionComponent<CartEmptyPorps> = (props) => {
  const { setOpenSwitch } = props;

  return (
    <>
      <div className="w-full flex items-center justify-start px-2 py-4 h-navbar cursor-pointer">
        <div className="w-[10%] flex items-center justify-start">
          <Icon
            name="GoArrowLeft"
            className="hover:text-primary"
            onClick={() => setOpenSwitch(false)}
          />
        </div>
        <div className="w-[90%] flex justify-center">
          <h5 className="text-base font-semibold">Add Games to Cart</h5>
        </div>
      </div>
      <div className="switch_body_scroll w-full p-5 flex flex-col items-center gap-4 justify-center">
        <Image imgUrl={emptyCart} name="empty_cart" styles="h-[340px]" />
        <p className="text-textColor  font-semibold">Cart is empty</p>
      </div>
    </>
  );
};
