import { Layout, Drawer, Affix } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

const Main = ({ children }: any) => {
    const [placement, setPlacement] = useState("right");
    const [visible, setVisible] = useState(false);
    const [sidenavColor, setSidenavColor] = useState("#E95420"); // #1890ff
    const [sidenavType, setSidenavType] = useState("transparent");

    const openDrawer = () => setVisible(!visible);
    const handleSidenavType = (type: any) => setSidenavType(type);
    const handleSidenavColor = (color: any) => setSidenavColor(color);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", "");

    useEffect(() => {
        pathname === "rtl" ? setPlacement("left") : setPlacement("right");
    }, [pathname]);

    return (
        <Layout
            className={`layout-dashboard ${
                pathname === "profile" ? "layout-profile" : ""
            } ${pathname === "rtl" ? "layout-dashboart-rtl" : ""}`}
        >
            <Drawer
                title={false}
                placement={placement === "right" ? "left" : "right"}
                closable={false}
                onClose={() => setVisible(false)}
                open={visible}
                key={placement === "right" ? "left" : "right"}
                width={250}
                className={`drawer-sidebar ${
                    pathname === "rtl" ? "drawer-sidebar-rtl" : ""
                } `}
            >
                <Layout
                    className={`layout-dashboard ${
                    pathname === "rtl" ? "layout-dashboard-rtl" : ""
                    }`}
                >
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                        trigger={null}
                        width={250}
                        theme="light"
                        className={`sider-primary ant-layout-sider-primary ${
                            sidenavType === "#fff" ? "active-route" : ""
                        }`}
                        style={{ background: sidenavType }}
                    >
                        <Sidenav color={sidenavColor} />
                    </Sider>
                </Layout>                                                                                                                                                                                                                                                                                   
            </Drawer>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${
                    sidenavType === "#fff" ? "active-route" : ""
                }`}
                style={{ background: sidenavType }}
            >
                <Sidenav color={sidenavColor} />
            </Sider>
            <Layout>
                <Affix>
                    <AntHeader className="ant-header-fixed">
                        <Header
                            onPress={openDrawer}
                            // name={pathname}
                            // subName={pathname}
                            // handleSidenavColor={handleSidenavColor}
                            // handleSidenavType={handleSidenavType}
                            // handleFixedNavbar={handleFixedNavbar}
                        />
                    </AntHeader>
                </Affix> 
                <Content className="content-ant">{children}</Content> 
                {/* <Footer /> */}
            </Layout>
        </Layout>
    );
};

export default Main;
