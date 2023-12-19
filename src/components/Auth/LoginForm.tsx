import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Typography, Input, Checkbox } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { LoginUserInput } from "../../types/user.type";

const { Title } = Typography;

export const LoginForm: FunctionComponent = () => {
    const handleOnSubmit = async (values: LoginUserInput) => {
        const { username, password } = values;
        console.log('values :>> ', values);
    };

    return (
        <Form
            onFinish={handleOnSubmit}
            className="mt-4"
            layout="vertical"
            initialValues={{
                remember: true
            }}
        >
            <Form.Item 
                name="username"
                label={
                    <Title style={{ color: "#F1F2FF", fontSize: "0.875rem" }}>
                        Email Address
                    </Title>
                }
                rules={[
                    {
                        required: true,
                        message: "Please input your Email!"
                    }
                ]}
            >
                <Input
                    placeholder="Enter email address"
                    className="form-style w-full"
                    autoComplete="email"
                />
            </Form.Item>
            <Form.Item 
                name="password"
                label={
                    <Title style={{ color: "#F1F2FF", fontSize: "0.875rem" }}>
                        Password
                    </Title>
                }
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input.Password
                    placeholder="Enter Password"
                    autoComplete="password"
                    className="form-style w-full"
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined style={{ color: '#6E727F', cursor: "pointer" }} />
                        ) : (
                            <EyeInvisibleOutlined style={{ color: '#6E727F', cursor: "pointer" }} />
                        )
                    }
                />
            </Form.Item>
            <div className="flex flex-1 items-center h-[30px]">
                <Form.Item name="remember" noStyle>
                    <Checkbox className="text-[#F1F2FF]" style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
                        Remember me
                    </Checkbox>
                </Form.Item>
                <Link to="/forgot-password" className="ml-auto max-w-max text-xs text-right text-[#F1F2FF]">
                    <p className="hover:text-orange-5">
                        Forgot Password
                    </p>
                </Link>
            </div>
            <Button
                type="primary"
                htmlType="submit"
                className="form-btn bg-orange-10"
            >
                Sign In
            </Button>
            <div className="flex justify-center text-[#F1F2FF] mt-4">
                Don't have an Account? &nbsp;
                <Link to="/signup">
                    <p className="hover:text-orange-5">
                        Sign up!
                    </p>
                </Link>
            </div>
        </Form>
    );
};