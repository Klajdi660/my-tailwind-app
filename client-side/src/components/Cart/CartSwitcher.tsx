import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CartBody, CartEmpty, CartHeader } from "../Cart";
import { Checkout } from "../Checkout/Checkout";
import { useCart } from "../../hooks";
import { RootState, useAppSelector } from "../../store";
import { CartSwitcherProps } from "../../types";
import { useAppUtil } from "../../utils";

export const CartSwitcher: FC<CartSwitcherProps> = () => {
  const { openSwitch, setOpenSwitch } = useAppUtil();
  const { removeGameSelected } = useCart();

  const cart = useAppSelector((state) => state.cart.items);
  const gameId = cart.map((game) => game.id);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [selectedHeaderOpen, setSelectedHeaderOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({
    gameId: 1,
  });

  const selectAllGameHandler = () => {
    if (isSelectAll) {
      setSelections([]);
      setIsSelectAll(false);
      setSelectedHeaderOpen(false);
      return;
    }

    setIsSelectAll(true);
    setSelectedHeaderOpen(true);
    setSelections(gameId);
  };

  const deleteSelectedGameHandler = () => {
    removeGameSelected(selections);
    setSelections([]);
    setIsSelectAll(false);
    setIsEditing(false);
  };

  const cancelGameSelectedHandler = () => {
    setIsEditing(false);
    setSelections([]);
    setIsSelectAll(false);
  };

  const backCartSwitchHandler = () => {
    setOpenSwitch(false);
    setIsEditing(false);
    setSelections([]);
    setIsSelectAll(false);
  };

  return (
    <>
      {checkoutOpen ? (
        <Checkout
          cartItems={cart}
          quantities={quantities}
          setOpenSwitch={setOpenSwitch}
          setCheckoutOpen={setCheckoutOpen}
        />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className={`w-full h-screen md:w-[380px] bg-switch md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
          >
            {cart && cart.length > 0 ? (
              <>
                <CartHeader
                  cart={cart}
                  isEditing={isEditing}
                  selections={selections}
                  isSelectAll={isSelectAll}
                  setIsEditing={setIsEditing}
                  selectAllGameHandler={selectAllGameHandler}
                  backCartSwitchHandler={backCartSwitchHandler}
                  cancelGameSelectedHandler={cancelGameSelectedHandler}
                  deleteSelectedGameHandler={deleteSelectedGameHandler}
                />
                <CartBody
                  cart={cart}
                  isEditing={isEditing}
                  selections={selections}
                  quantities={quantities}
                  selectedHeaderOpen={selectedHeaderOpen}
                  setSelections={setSelections}
                  setQuantities={setQuantities}
                  setCheckoutOpen={setCheckoutOpen}
                  setSelectedHeaderOpen={setSelectedHeaderOpen}
                />
              </>
            ) : (
              <CartEmpty setOpenSwitch={setOpenSwitch} />
            )}
          </motion.div>
        </>
      )}
    </>
  );
};
