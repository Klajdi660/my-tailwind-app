import { Layout } from "antd";
import { Footer, Navbar, Sidebar } from "../components";
import SidebarMini from "../components/SidebarMini";

interface Props {
  children?: React.ReactNode,
};

export const PublicLayout = ({
  children,
  ...restProps
}: Props): JSX.Element => {
  return (
    // <Layout className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
    <Layout className="relative sm:-8 bg-richblack-20 min-h-screen flex flex-row">
      {/* <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div> */}
      <SidebarMini/>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
        <Navbar />
        {children}
        <Footer/>
      </div>
    </Layout>
  );
};
