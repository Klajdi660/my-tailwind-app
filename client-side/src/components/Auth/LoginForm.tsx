import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate, /*useLocation*/ } from "react-router-dom";
import { Button, Form, Input, Checkbox } from "antd";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuthService from "../../services/AuthService";
import { useAuth } from "../../hooks";
import { LoginUserInput } from "../../types/user.type";
import { IconButton } from "../UI";
// import { loginValidation } from "../../utils";
// import { yupResolver } from "@hookform/resolvers/yup";

export const LoginForm: FunctionComponent = () => {
    const { login } = useAuthService();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) localStorage.lastLocation ? navigate(`/${localStorage.lastLocation}`) : navigate("/discover");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnSubmit = async (values: LoginUserInput) => {
        const { username, password, /*remember*/ } = values;

        try {
            await login(username, password);
        } catch (error) {
            console.error("Failed to login!", error)
        }
    };

    const [form] = Form.useForm();

    return (
        <Form
            onFinish={handleOnSubmit}
            form={form}
            layout="vertical"
            className="flex flex-col gap-5"
            initialValues={{
                remember: false
            }}
        >
            <Form.Item 
                name="username"
                label={
                    <div className="text-xs font-semibold text-secondary">
                        Email or Username
                    </div>
                }
                rules={[
                    {
                        required: true,
                        message: "Please input your Email or Username!"
                    }
                ]}
            >
                <Input
                    placeholder="Email Address or Username"
                    className="w-full h-10"
                    autoComplete="email"
                />
            </Form.Item>
            <Form.Item 
                name="password"
                label={
                    <div className="text-xs font-semibold text-secondary">
                        Password
                    </div>
                }
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input.Password
                    placeholder="Password"
                    autoComplete="password"
                    className="mb-0 w-full h-10"
                    // iconRender={(visible) =>
                    //     visible ? (
                    //         <FiEye style={{ color: '#6E727F', cursor: "pointer" }} />
                    //     ) : (
                    //         <FiEyeOff style={{ color: '#6E727F', cursor: "pointer" }} />
                    //     )
                    // }
                    iconRender={(visible) => (
                        <IconButton
                            name={visible ? "AiFillEye" : "AiFillEyeInvisible"}
                            iconClassName="text-onNeutralBg"
                        />
                    )}
                />
            </Form.Item>
            <div className="flex flex-1 items-center h-[30px]">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-secondary" style={{ fontSize: "12px", lineHeight: "16px" }}>
                        Remember me
                    </Checkbox>
                </Form.Item>
                <Link to="/forgot-password" className="ml-auto max-w-max text-xs text-right text-onNeutralBg">
                    <p className="text-xs text-primary hover:underline underline-offset-2">
                        Forgot Password!
                    </p>
                </Link>
            </div>
            <Button
                type="primary"
                htmlType="submit"
                className="h-10 bg-primary"
            >
                Login
            </Button>
            <div className="flex justify-center text-sm text-onNeutralBg">
                Don't have an Account? &nbsp;
                <Link to="/register">
                    <p className="text-primary hover:underline underline-offset-2">
                        Sign up!
                    </p>
                </Link>
            </div>
        </Form>
    );
};
