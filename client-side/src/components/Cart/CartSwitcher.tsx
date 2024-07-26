import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { CartBody, CartEmpty, CartHeader, CartFooter } from "../Cart";
import { Overlay } from "../UI";
import { useCart } from "../../hooks";
import { RootState } from "../../store";
import { CartSwitcherProps } from "../../types";
import { classNames, useAppUtil, useMobileResponsive } from "../../utils";

export const CartSwitcher: FunctionComponent<CartSwitcherProps> = () => {
  const { openSwitch, setOpenSwitch } = useAppUtil();
  const { removeGameSelected } = useCart();
  const isMobile = useMobileResponsive();

  const cart = useSelector((state: RootState) => state.cart.items);
  const gameId = cart.map((game) => game.id);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({
    gameId: 1,
  });

  const selectAllGameHandler = () => {
    if (isSelectAll) {
      setSelections([]);
      setIsSelectAll(false);
    }

    setIsSelectAll(true);
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
    <section
      className={classNames(
        // "cart_switch_section w-aside bg-switch",
        "cart_switch_section w-[380px] bg-switch",
        openSwitch ? "right-0" : "-right-aside"
      )}
    >
      <Overlay
        isOpen={openSwitch}
        handleIsOpen={backCartSwitchHandler}
        transparent
        isMobile={isMobile}
      />
      <div
        // className="switch_body relative h-screen overflow-auto text-onNeutralBg bg-switch shadow-box"
        className="switch_body relative text-onNeutralBg bg-switch shadow-box"
      >
        {checkoutOpen ? (
          <div className="text-onNeutralBg">Test</div>
        ) : (
          <>
            {cart && cart.length > 0 ? (
              <>
                <CartHeader
                  cart={cart}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  backCartSwitchHandler={backCartSwitchHandler}
                  isSelectAll={isSelectAll}
                  selections={selections}
                  selectAllGameHandler={selectAllGameHandler}
                  cancelGameSelectedHandler={cancelGameSelectedHandler}
                  deleteSelectedGameHandler={deleteSelectedGameHandler}
                />
                <CartBody
                  cart={cart}
                  isEditing={isEditing}
                  selections={selections}
                  setSelections={setSelections}
                  quantities={quantities}
                  setQuantities={setQuantities}
                />
                <CartFooter
                  setCheckoutOpen={setCheckoutOpen}
                  cartItems={cart}
                  quantities={quantities}
                />
              </>
            ) : (
              <CartEmpty setOpenSwitch={setOpenSwitch} />
            )}
          </>
        )}
      </div>
    </section>
  );
};
