import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Icon } from "../Icon";
import { CartButtonProps } from "../../../types";
import { useAppUtil } from "../../../utils";
import { RootState } from "../../../store";

export const CartButton: FunctionComponent<CartButtonProps> = () => {
  const { setOpenSwitch } = useAppUtil();

  const cart = useSelector((state: RootState) => state.cart.items);

  console.log("cart 111 :>> ", cart);

  return (
    <div
      className="flex items-center h-full cursor-pointer"
      onClick={() => setOpenSwitch(true)}
    >
      <div className="relative group">
        {cart.length > 0 && (
          <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
            <span className="text-xs text-white group-hover:text-primary">
              {cart.length}
            </span>
          </div>
        )}
        <div className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity group-hover:bg-primary">
          <Icon name="FaOpencart" className="group-hover:!text-white" />
        </div>
      </div>
    </div>
  );
};
