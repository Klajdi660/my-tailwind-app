// import { Navbar, Sidebar } from "../components";
import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { logo } from "../constants";
import { formList } from "../constants";
import { HeaderForm } from "../components/Auth/HeaderForm";
interface Props {
  children?: React.ReactNode
};

export const PublicLayout = ({
  children,
  ...restProps
}: Props): JSX.Element => {
  let { pathname } = useLocation();
  pathname = pathname.replace(/\//,'');

  const list = useMemo(() => {
    return formList[pathname]
  }, [pathname]);

  return (
    // <Layout className="relative sm:-8 bg-richblack-20 min-h-screen flex flex-row">
    //   <Sidebar />
    //   <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
    //     <Navbar />
    //     {children}
    //   </div>
    // </Layout>
    // <div className="auth_page">
      <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
        <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
          <div>
            <HeaderForm 
              title={list[2].formName}
              logoName={logo.name}
              logoIcon={logo.icon}
              pathname={pathname}
            />
            <Outlet />
          </div>
        </div>
      </div>
    // </div>
  );
};
