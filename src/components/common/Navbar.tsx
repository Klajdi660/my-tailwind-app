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
                className="btn"
            >
              Login
            </Button>              
        </Header>
    );
};

export default Navbar;
