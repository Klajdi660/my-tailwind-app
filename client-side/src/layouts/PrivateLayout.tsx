import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartSwitcher, Loading, Navbar, Sidebar, TopPlay } from "../components";
import { useAuth } from "../hooks";
import { useUserService } from "../services";
import { ProviderProps } from "../types";

export const PrivateLayout = ({ children, ...restProps }: ProviderProps) => {
  const { getUserDetails } = useUserService();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      navigate("/discover");
    }
  }, [user]);

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
