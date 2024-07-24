import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { CartBody, CartHeader, CartFooter } from "../Cart";
import { Overlay } from "../UI";
import { RootState } from "../../store";
import { CartSwitcherProps } from "../../types";
import { classNames, useAppUtil, useMobileResponsive } from "../../utils";

export const CartSwitcher: FunctionComponent<CartSwitcherProps> = () => {
  const { openSwitch, setOpenSwitch } = useAppUtil();
  const isMobile = useMobileResponsive();

  const cart = useSelector((state: RootState) => state.cart.items);

  const [isEditing, setIsEditing] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleBackCartSwitch = () => {
    setOpenSwitch(false);
    setIsEditing(false);
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
        handleIsOpen={handleBackCartSwitch}
        transparent
        isMobile={isMobile}
      />
      <div className="relative h-screen overflow-auto switch_body text-onNeutralBg bg-switch shadow-box">
        <CartHeader
          cart={cart}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleBackCartSwitch={handleBackCartSwitch}
          isSelectAll={isSelectAll}
          setIsSelectAll={setIsSelectAll}
        />
        <CartBody
          cart={cart}
          isSelectAll={isSelectAll}
          setIsSelectAll={setIsSelectAll}
        />
      </div>
    </section>
  );
};
