import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Modal,
  Navbar,
  Sidebar,
  // TopPlay,
  // Loading,
  CartSwitcher,
  TabTitle,
} from "../components";
import { useAppUtil, classNames, getAside } from "../utils";
import { ProviderProps } from "../types";

export const PrivateLayout: FC<ProviderProps> = ({ children }) => {
  const { openSwitch } = useAppUtil();
  const [parent] = useAutoAnimate();
  const { pathname } = useLocation();

  const hasAside = getAside(pathname);

  return (
    <div
      className="flex flex-col max-w-full m-auto xl:flex-row app bg-main text-onNeutralBg"
      id="main_app"
    >
      <TabTitle />
      {/* <Loading /> */}
      <Sidebar />

      <main className="relative w-full mx-auto overflow-hidden main_section">
        <Navbar />
        <div
          ref={parent}
          className={classNames(
            "page_content relative overflow-y-scroll hide_scrollbar p-3 sm:p-6 mb-6 mt-main-top",
            hasAside ? "main_width" : "other_main_width"
          )}
        >
          {children}
        </div>
      </main>
      {/* <TopPlay /> */}
      {openSwitch && <CartSwitcher />}
      <Modal />
    </div>
  );
};
