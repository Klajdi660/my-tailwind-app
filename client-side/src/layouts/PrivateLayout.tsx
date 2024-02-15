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

import { Outlet } from "react-router-dom";
import { Sidebar, Navbar, Footer } from "../components";
import { FunctionComponent } from "react";

export const PrivateLayout: FunctionComponent = () => {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-richblack-20 min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
          <Navbar />
          <Outlet />
          <Footer/>
        </div>
      </div>
    </>
  )
};
