import { CartSwitcher, Loading, Navbar, Sidebar, TopPlay } from "../components";
import { ProviderProps } from "../types";
import { useUserService } from "../services";
import { useEffect } from "react";

export const PrivateLayout = ({ children, ...restProps }: ProviderProps) => {
  const { getUserDetails } = useUserService();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await getUserDetails();
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};

// xl:mb-[100px] max-w-7xl
