import { useState } from "react";
import { Layout, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Sidebar, Navbar, Footer } from "../components";
interface PrivateLayoutPropsType {
  children: React.ReactNode,
};

const { Header, Content } = Layout;

export const PrivateLayout = ({ 
  children, 
  ...restProps 
}: PrivateLayoutPropsType): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // <Layout style={{ height: "100vh" }}>
    //   <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: "white", maxHeight: "100vh" }} width={250} >
    //     <SideMenu collapsed={collapsed} />
    //   </Sider>
    //   <Layout style={{ maxHeight: "100vh" }}>
    //     <Header style={{ padding: 5, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 0.125rem 0.25rem rgb(0 0 0 / 20%)" }}>
    //       <Button
    //         type="text"
    //         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    //         onClick={() => setCollapsed(!collapsed)}
    //         style={{ fontSize: '16px', width: 64, height: 64, }}
    //       />
    //     </Header>
    //     <Content style={{ margin: '15px', padding: 5, maxHeight: "100%" }}>
    //       {children}
    //     </Content>
    //   </Layout>
    // </Layout>
    <Layout className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 flex flex-col">
        <Navbar />
        {children}
        <Footer/>
      </div>
    </Layout>
  )
};
