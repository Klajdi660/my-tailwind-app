import { Layout, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
    return (
        <Header className="bg-richblack-800">
            <Button 
                href="/login" 
                icon={<UserOutlined />} 
                size="large"
                type="primary"
                style={{ background: "#2C333F" }}
                className="btn text-orange-5 border border-orange-5 hover:text-richblack-700"
            >
              Login
            </Button>              
        </Header>
    );
};

export default Navbar;
