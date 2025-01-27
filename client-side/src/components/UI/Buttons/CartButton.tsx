import { FC } from "react";
import { Icon } from "../Icon";
import { useAppSelector } from "../../../store";
import { useAppUtil } from "../../../utils";

export const CartButton: FC = () => {
  const { setOpenSwitch } = useAppUtil();

  const cart = useAppSelector((state) => state.cart.items);

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
        <div className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center group-hover:bg-primary-opacity">
          <Icon name="FaOpencart" className="group-hover:text-primary" />
        </div>
      </div>
    </div>
  );
};
