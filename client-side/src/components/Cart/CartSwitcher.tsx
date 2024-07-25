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

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);

  const selectAllGameHandler = () => {
    if (isSelectAll) {
      setSelections([]);
      setIsSelectAll(false);
    }

    setIsSelectAll(true);

    const gameId = cart.map((game) => game.id);
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
        "cart_switch_section w-aside bg-switch",
        openSwitch ? "right-0" : "-right-aside"
      )}
    >
      <Overlay
        isOpen={openSwitch}
        handleIsOpen={backCartSwitchHandler}
        transparent
        isMobile={isMobile}
      />
      <div className="relative h-screen overflow-auto switch_body text-onNeutralBg bg-switch shadow-box">
        {checkoutOpen ? (
          <div className="text-onNeutralBg">Test</div>
        ) : (
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
            {cart && cart.length > 0 ? (
              <CartBody
                cart={cart}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                setCheckoutOpen={setCheckoutOpen}
              />
            ) : (
              <div className="w-full flex-1 flex items-center justify-center">
                <CartEmpty />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
