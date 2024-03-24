// import { useState } from "react";
// import { Drawer, Layout } from "antd";
// import { Sidebar, Navbar, Footer } from "../components";
// interface PrivateLayoutPropsType {
//   children: React.ReactNode,
// };

// export const PrivateLayout = ({
//   children,
//   ...restProps
// }: PrivateLayoutPropsType): JSX.Element => {

//   return (
//     <Layout className="relative sm:-8 p-4 bg-richblack-20 min-h-screen flex flex-row">
//       <div className="sm:flex hidden mr-10 relative">
//         <Sidebar />
//       </div>
//       <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
//         <Navbar />
//         {children}
//         <Footer/>
//       </div>
//     </Layout>
//   )
// };

import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar, TopPlay, CartSwitcher } from "../components";

export const PrivateLayout: FunctionComponent = () => {
  return (
    <>
      {/* <div className="relative sm:-8 p-4 bg-richblack-20 min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
          <Navbar />
          <Outlet />
          <Footer/>
        </div>
      </div> */}
      <div
        className="flex flex-col max-w-full m-auto xl:flex-row app bg-main"
        id="main_app"
      >
        <Sidebar />
        <main className="relative w-full mx-auto overflow-hidden main_section">
          <Navbar />
          <div className="relative mb-6 overflow-y-scroll hide_scrollbar p-3 sm:p-6 main_width page_content mt-main-top">
            <Outlet />
          </div>
        </main>
        <TopPlay />
        <CartSwitcher />
      </div>
    </>
  );
};

// xl:mb-[100px] max-w-7xl
