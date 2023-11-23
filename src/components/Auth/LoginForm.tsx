import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Typography, Input } from "antd";
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
            // form={form}
            className="mt-6"
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
                    // name="email"
                    // value={email}
                    // onChange={handleOnChange}
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
                    // name="password"
                    // value={password}
                    // onChange={handleOnChange}
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
            <Link to="/forgot-password">
                <p className="ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                </p>
            </Link>
            <Button
                type="primary"
                htmlType="submit"
                className="form-btn bg-orange-10"
            >
                Sign In
            </Button>
        </Form>
    );
};