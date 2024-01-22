import { Layout } from "antd";
import { Footer, Navbar, Sidebar } from "../components";

interface Props {
  children?: React.ReactNode,
};

// const { Sider, Header, Footer, Content} = Layout;
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
    // <Layout 
    //   style={{ 
    //     width: "100%", 
    //     height: '100%', 
    //     overflow: "hidden"
    //   }}
    // >
    //   <Sider 
    //     width="64px" 
    //     style={{ 
    //       height: "100vh", 
    //       background: "#000", 
    //       color: "#fff", 
    //       textAlign: "center", 
    //       lineHeight: "120px", 
    //       borderRight: "1px solid #fff" 
    //     }
    //   }>
    //     Slider
    //   </Sider>
    //   <Layout>
    //     <Header 
    //       style={{ 
    //         textAlign: "left", 
    //         height: "64px", 
    //         lineHeight: "64px", 
    //         color: "#fff", 
    //         background: "#000", 
    //         paddingInline: "48px", 
    //         borderBottom: "1px solid #fff" 
    //       }}
    //     >
    //       Header
    //     </Header>
    //     <Content 
    //       style={{ 
    //         textAlign: "left", 
    //         lineHeight: "120px", 
    //         background: "#000", 
    //         color: "#fff", 
    //         padding: "0 50px" 
    //       }}
    //     >
    //       Content
    //     </Content>      
    //   </Layout>
    // </Layout>
  );
};
