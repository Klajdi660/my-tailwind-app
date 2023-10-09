import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
// import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
  GoogleOutlined,
  AppstoreOutlined,
  UserOutlined
} from "@ant-design/icons";
import { iconsSvg } from "../assets/images/icons";
import type { MenuProps } from 'antd';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { templateIcon, profileIcon, signupIcon, signinIcon } = iconsSvg.headerFormIcons;

const SignIn = () => {
  const headerItems: MenuProps['items'] = [
    {
      label: 'Dashboard',
      key: '1',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Profile',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: 'Sign Up',
      key: '3',
      icon: signupIcon,
    },
    {
      label: 'Sign In',
      key: '4',
      icon: signinIcon,
    },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (checked: any) => {
      console.log(`switch to ${checked}`);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>Antd Dashboard</h5>
        </div>
        <div className="header-col header-nav">
          {/* <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="dashboard">
              <Link to="/dashboard">
                {templateIcon}
                <span> Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">
                {profileIcon}
                <span>Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/sign-up">
                {signupIcon}
                <span> Sign Up</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="signin">
              <Link to="/sign-in">
                {signinIcon}
                <span> Sign In</span>
              </Link>
            </Menu.Item>
          </Menu> */}
          <Menu defaultSelectedKeys={['1']} mode="horizontal" items={headerItems} />
        </div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            //   className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                // name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Password"
                // name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input placeholder="Password" name="password"/>
              </Form.Item>
              <Form.Item
                // name="remember"
                className="aligin-center"
                valuePropName="checked"
              >
                <Switch  onChange={onChange} />
                Remember me
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Sign Up
                </Link>
              </p>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            {/* <img src={signinbg} alt="" /> */}
          </Col>
        </Row>
      </Content>
      {/* <Footer>
        <Menu mode="horizontal">
          <Menu.Item key="company">Company</Menu.Item>
          <Menu.Item key="about">About Us</Menu.Item>
          <Menu.Item key="teams">Teams</Menu.Item>
          <Menu.Item key="products">Products</Menu.Item>
          <Menu.Item key="blogs">Blogs</Menu.Item>
          <Menu.Item key="pricing">Pricing</Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="menu-nav-social">
          <Menu.Item key="dribble">
            <Link to="#">{<DribbbleOutlined />}</Link>
          </Menu.Item>
          <Menu.Item key="twitter">
            <Link to="#">{<TwitterOutlined />}</Link>
          </Menu.Item>
          <Menu.Item key="instagram">
            <Link to="#">{<InstagramOutlined />}</Link>
          </Menu.Item>
          <Menu.Item key="google">
            <Link to="#">{<GoogleOutlined />}</Link>
          </Menu.Item>
          <Menu.Item key="github">
            <Link to="#">{<GithubOutlined />}</Link>
          </Menu.Item>
        </Menu>
        <p className="copyright">
          {" "}
          Copyright © 2021 Antd Dashboard by <a href="#pablo">TIP</a>.{" "}
        </p>
      </Footer> */}
    </Layout>
  );
};

export default SignIn;

