import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Affix } from "antd";
import Header from "./Header";

const { Header: AntHeader, Content } = Layout;

const Dashboard = ({ children }: any) => {
    const [visible, setVisible] = useState(false);

    const openDrawer = () => setVisible(!visible);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", "");

    return (
        <>
            <Layout>
                <Affix>
                    <AntHeader className="ant-header-fixed">
                        <Header
                            onPress={openDrawer}
                            name={pathname}
                            subName={pathname}
                            // handleSidenavColor={handleSidenavColor}
                            // handleSidenavType={handleSidenavType}
                            // handleFixedNavbar={handleFixedNavbar}
                        />
                    </AntHeader>
                </Affix> 
                <Content className="content-ant">{children}</Content> 
                {/* <Footer /> */}
            </Layout>
        </>
    );
};

export default Dashboard;