import { FunctionComponent } from "react";
import { classNames, useAppUtil, useMobileResponsive } from "../lib";
import { Icon, Overlay } from "./UI";

interface CartSwitcherProps {}

export const CartSwitcher: FunctionComponent<CartSwitcherProps> = () => {
  const { openSwitch, setOpenSwitch } = useAppUtil();
  const isMobile = useMobileResponsive();

  return (
    <section
      className={classNames(
        "cart_switch_section w-aside z-[1200]",
        openSwitch ? "right-0" : "-right-aside"
      )}
    >
      <Overlay
        isOpen={openSwitch}
        handleIsOpen={setOpenSwitch}
        transparent
        isMobile={isMobile}
      />
      <div className="relative h-screen overflow-auto switch_body text-onNeutralBg bg-switch shadow-box">
        <div className="p-5 pb-4 switch_header flex_justify_between">
          <h5 className="">Cart List</h5>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded flex_justify_center bg-main"
              onClick={() => setOpenSwitch(false)}
            >
              <Icon name="TiTimes" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
