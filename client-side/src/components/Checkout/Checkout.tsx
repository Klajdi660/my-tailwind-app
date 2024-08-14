import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CheckoutBody, CheckoutHeader } from "../Checkout";
import { calculateTotalPrice } from "../../utils";
import { GameParams } from "../../types";

interface CartCheckoutPorps {
  cartItems: GameParams[];
  quantities: { [id: string]: number };
  setOpenSwitch: (openSwitch: boolean) => void;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
}

export const Checkout: FC<CartCheckoutPorps> = (props) => {
  const { setOpenSwitch, setCheckoutOpen, cartItems, quantities } = props;

  const [paymentMethod, setPaymentMethod] = useState<string>("bank");

  const closeCheckoutHandler = () => {
    setOpenSwitch(true);
    setCheckoutOpen(false);
  };

  const { totalPrice } = calculateTotalPrice(cartItems, quantities);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      <CheckoutHeader closeCheckoutHandler={closeCheckoutHandler} />
      <CheckoutBody
        totalPrice={totalPrice}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </motion.div>
  );
};
