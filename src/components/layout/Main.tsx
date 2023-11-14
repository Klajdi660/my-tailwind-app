import { Layout, Drawer, Affix } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";
import Sidebar from "../common/Sidebar";

const { Header: AntHeader, Content, Sider } = Layout;

const Main = ({ children }: any) => {
    const [visible, setVisible] = useState(false);
    const [sidenavColor, setSidenavColor] = useState("#E95420"); // #1890ff
    const [sidenavType, setSidenavType] = useState("transparent");

    const openDrawer = () => setVisible(!visible);
    const handleSidenavType = (type: any) => setSidenavType(type);
    const handleSidenavColor = (color: any) => setSidenavColor(color);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", "");

    // useEffect(() => {
    //     pathname === "rtl" ? setPlacement("left") : setPlacement("right");
    // }, [pathname]);

    return (
      // <Layout className="layout-dashboard">
      //     <Drawer
      //         title={false}
      //         placement="left"
      //         closable={false}
      //         onClose={() => setVisible(false)}
      //         open={visible}
      //         key="left"
      //         width={250}
      //         className="drawer-sidebar"
      //     >
      //         <Layout className="layout-dashboard">
      //             <Sider
      //                 breakpoint="lg"
      //                 collapsedWidth="0"
      //                 onCollapse={(collapsed, type) => {
      //                     console.log(collapsed, type);
      //                 }}
      //                 trigger={null}
      //                 width={250}
      //                 theme="dark"
      //                 className={`sider-primary ant-layout-sider-primary ${
      //                     sidenavType === "#fff" ? "active-route" : ""
      //                 }`}
      //                 style={{ background: sidenavType }}
      //             >
      //                 <Sidenav color={sidenavColor} />
      //             </Sider>
      //         </Layout>                                                                                                                                                                                                                                                                                   
      //     </Drawer>
      //     <Sider
      //         breakpoint="lg"
      //         collapsedWidth="0"
      //         onCollapse={(collapsed, type) => {
      //             console.log(collapsed, type);
      //         }}
      //         trigger={null}
      //         width={250}
      //         theme="light"
      //         className={`sider-primary ant-layout-sider-primary ${
      //             sidenavType === "#fff" ? "active-route" : ""
      //         }`}
      //         style={{ background: sidenavType }}
      //     >
      //         <Sidenav color={sidenavColor} />
      //     </Sider>
      //     <Layout>
      //         <Affix>
      //             <AntHeader className="ant-header-fixed">
      //                 <Header
      //                     onPress={openDrawer}
      //                     name={pathname}
      //                     subName={pathname}
      //                     // handleSidenavColor={handleSidenavColor}
      //                     // handleSidenavType={handleSidenavType}
      //                     // handleFixedNavbar={handleFixedNavbar}
      //                 />
      //             </AntHeader>
      //         </Affix> 
      //         <Content className="content-ant">{children}</Content> 
      //         {/* <Footer /> */}
      //     </Layout>
      // </Layout>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
    );
};

export default Main;
