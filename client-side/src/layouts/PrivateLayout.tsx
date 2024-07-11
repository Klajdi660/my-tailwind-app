import { useEffect } from "react";
import {
  CartSwitcher,
  Loading,
  Navbar,
  Sidebar,
  TopPlay,
  Modal,
} from "../components";
import { useUserService } from "../services";
import { ProviderProps } from "../types";

export const PrivateLayout = ({ children }: ProviderProps) => {
  const { getUserDetails } = useUserService();

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const user = await getUserDetails();
  //     } catch (error) {
  //       console.error("Failed to fetch user details:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  return (
    <div
      className="flex flex-col max-w-full m-auto xl:flex-row app bg-main"
      id="main_app"
    >
      <Loading />
      <Sidebar />
      <main className="relative w-full mx-auto overflow-hidden main_section">
        <Navbar />
        <div className="relative mb-6 overflow-y-scroll hide_scrollbar p-3 sm:p-6 main_width page_content mt-main-top">
          {children}
        </div>
      </main>
      <TopPlay />
      <CartSwitcher />
      <Modal />
    </div>
  );
};
