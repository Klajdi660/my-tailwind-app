import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  CartSwitcher,
  Loading,
  Modal,
  Navbar,
  Sidebar,
  TabTitle,
} from "../components";
import { useStore } from "../hooks";
import { classNames, getAside } from "../utils";

export const PrivateLayout: FC = () => {
  const { openSwitch } = useStore();
  const [parent] = useAutoAnimate();
  const { pathname } = useLocation();

  const hasAside = getAside(pathname);

  return (
    <div
      className="flex flex-col max-w-full m-auto xl:flex-row app bg-main text-onNeutralBg"
      id="main_app"
    >
      <TabTitle />
      <Loading />
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
          <Outlet />
        </div>
      </main>
      {openSwitch && <CartSwitcher />}
      <Modal />
    </div>
  );
};
