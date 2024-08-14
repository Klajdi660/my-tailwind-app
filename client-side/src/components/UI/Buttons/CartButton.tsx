import { FC } from "react";
import { useSelector } from "react-redux";
import { Icon } from "../Icon";
import { RootState } from "../../../store";
import { useAppUtil } from "../../../utils";
import { CartButtonProps } from "../../../types";

export const CartButton: FC<CartButtonProps> = () => {
  const { setOpenSwitch } = useAppUtil();

  const cart = useSelector((state: RootState) => state.cart.items);

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
