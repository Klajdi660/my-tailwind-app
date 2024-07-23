import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { Icon, Overlay, Button } from "../UI";
import { RootState } from "../../store";
import { CartSwitcherProps } from "../../types";
import { classNames, useAppUtil, useMobileResponsive } from "../../utils";
import { CartItem } from "./CartItem";

export const CartSwitcher: FunctionComponent<CartSwitcherProps> = () => {
  const { openSwitch, setOpenSwitch } = useAppUtil();
  const isMobile = useMobileResponsive();

  const cart = useSelector((state: RootState) => state.cart.items);

  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(true);

  const handleBackCartSwitch = () => {
    setOpenSwitch(false);
    setIsEditing(false);
  };

  return (
    <section
      className={classNames(
        // "cart_switch_section w-aside z-[1200]",
        "cart_switch_section w-aside",
        openSwitch ? "right-0" : "-right-aside"
      )}
    >
      <Overlay
        isOpen={openSwitch}
        // handleIsOpen={setOpenSwitch}
        handleIsOpen={handleBackCartSwitch}
        transparent
        isMobile={isMobile}
      />
      <div className="relative h-screen overflow-auto switch_body text-onNeutralBg bg-switch shadow-box">
        <div className="p-4 switch_header flex_justify_between">
          <div className="flex items-center gap-4 cursor-pointer">
            <div onClick={handleBackCartSwitch}>
              <Icon name="GoArrowLeft" className="hover:text-primary" />
            </div>
            <h5 className="text-base font-semibold">Games</h5>
            <Badge
              count={show ? cart.length : 0}
              showZero
              color="var(--primary)"
            />
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <div className="group">
                <Button
                  variant="none"
                  label="Edit"
                  labelIcon="AiOutlineEdit"
                  className="w-full h-8 flex_justify_center text-onNeutralBg group-hover:text-primary"
                  iconClassName="text-onNeutralBg group-hover:text-primary"
                  onClick={() => setIsEditing(true)}
                />
              </div>
            )}
            {isEditing && (
              <div className="flex cursor-pointer">
                <Button
                  variant="none"
                  className="w-8 h-8 flex_justify_center"
                  iconClassName="hover:text-primary"
                  labelIcon="BiSelectMultiple"
                  tooltipTitle="Select all"
                />
                <Button
                  variant="none"
                  className="w-8 h-8 flex_justify_center"
                  iconClassName="hover:text-primary"
                  labelIcon="AiOutlineDelete"
                  tooltipTitle="Delete"
                />
                <Button
                  variant="none"
                  labelIcon="MdOutlineCancel"
                  className="w-8 h-8 flex_justify_center"
                  iconClassName="hover:text-primary"
                  onClick={() => setIsEditing(false)}
                  tooltipTitle="Cancel"
                />
              </div>
            )}
          </div>
        </div>
        <div className="switch_body px-2">
          <div className={classNames("list_content")}>
            <ul className="flex flex-col w-full list-none">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  imageDims="16"
                  listDivider={false}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="p-4 switch_footer flex_justify_between">
          <div className="flex items-center gap-2">
            <h5 className="text-base font-semibold">Total Price</h5>
          </div>
          <div className="group">
            <Button
              label="Checkout"
              variant="none"
              labelIcon="CiShoppingTag"
              className="bg-primary-opacity rounded-full group-hover:bg-primary group-hover:text-white"
              iconClassName="text-onNeutralBg group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
