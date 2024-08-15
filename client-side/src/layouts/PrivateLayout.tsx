import { FC, useEffect } from "react";
import {
  Modal,
  Navbar,
  Sidebar,
  TopPlay,
  Loading,
  CartSwitcher,
  // SidebarMini,
  TabTitle,
} from "../components";
import { useAppUtil } from "../utils";
import { ProviderProps } from "../types";
import { useUserService } from "../services";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const PrivateLayout: FC<ProviderProps> = ({ children }) => {
  const { openSwitch } = useAppUtil();
  const [parent] = useAutoAnimate();

  const { getUserDetails } = useUserService();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails();
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div
      className="flex flex-col max-w-full m-auto xl:flex-row app bg-main"
      id="main_app"
    >
      <TabTitle />
      {/* <Loading /> */}
      <Sidebar />

      <main className="relative w-full mx-auto overflow-hidden main_section">
        <Navbar />
        <div
          ref={parent}
          className="relative mb-6 overflow-y-scroll hide_scrollbar p-3 sm:p-6 main_width page_content mt-main-top"
        >
          {children}
        </div>
      </main>
      <TopPlay />
      {openSwitch && <CartSwitcher />}
      <Modal />
    </div>
  );
};
