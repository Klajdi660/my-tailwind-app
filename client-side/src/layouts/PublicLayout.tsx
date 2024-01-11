import { Layout } from "antd";
import { Footer, Navbar, Sidebar } from "../components";

interface Props {
  children?: React.ReactNode,
};

export const PublicLayout = ({
  children,
  ...restProps
}: Props): JSX.Element => {
  return (
    <Layout className="relative sm:-8 bg-richblack-20 min-h-screen flex flex-row">
      <Sidebar />
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
        <Navbar />
        {children}
        <Footer/>
      </div>
    </Layout>
  );
};
