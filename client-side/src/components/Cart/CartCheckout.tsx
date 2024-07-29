import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Icon } from "../UI";

interface CartCheckoutPorps {
  setOpenSwitch: (openSwitch: boolean) => void;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
}

export const CartCheckout: FunctionComponent<CartCheckoutPorps> = (props) => {
  const { setOpenSwitch, setCheckoutOpen } = props;

  const closeCheckoutHandler = () => {
    setOpenSwitch(true);
    setCheckoutOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      <div className="w-full flex items-center justify-start px-2 py-4 h-navbar cursor-pointer">
        <div className="w-[10%] flex items-center justify-start">
          <Icon
            name="GoArrowLeft"
            className="hover:text-primary"
            onClick={closeCheckoutHandler}
          />
        </div>
        <div className="w-[90%] flex justify-center">
          <h5 className="text-base font-semibold">Secured Payment</h5>
        </div>
      </div>
    </motion.div>
  );
};
