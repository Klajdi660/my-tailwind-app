import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Space, Input, Button, Typography, Checkbox } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Tab } from "../UI/Tab";
import { accTypeData } from "../../data";
import useAuthService from "../../services/AuthService";
import { RegisterUserInput } from "../../types/user.type";
import { useAuth } from "../../hooks";
import { toast } from "react-toastify";

const { Title } = Typography;

const SignUpForm: FunctionComponent = () => {
    // student or instructor
    const [accountType, setAccountType] = useState(accTypeData[0].tabName);
    const { signup } = useAuthService();
    const { setSignUpData } = useAuth();

    const handleOnSubmit = async (values: RegisterUserInput) => {
        try {
            const signupValues = { 
                ...values, 
                accountType 
            };
            
            setSignUpData(signupValues);
            
            await signup(values, accountType);
        } catch (error: any) {
            const { message } = error.response.data;
            toast.error(message);
        }
    };

    return (
        <>
            {/* <Tab 
                tabData={accTypeData}
                field={accountType}
                setField={setAccountType}
            /> */}
            <Form 
                onFinish={handleOnSubmit} 
                layout="vertical"
                // className="mt-6"
                className="mt-4"
                initialValues={{
                    remember: false
                }}
            >
                <Space className="flex gap-x-4">
                    <Form.Item
                        name="firstName"
                        label={
                            <Title
                                style={{ color: "#F1F2FF", fontSize: "0.875rem", fontWeight: 400 }}
                            >
                                First Name
                            </Title>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input your First Name!"
                            }
                        ]}
                    >
                        <Input
                            placeholder="Enter first name"
                            className="form-style"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label={
                            <Title 
                                style={{ color: "#F1F2FF", fontSize: "0.875rem", fontWeight: 400 }}
                            >
                                Last Name
                            </Title>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input your Last Name!"
                            }
                        ]}
                    >
                        <Input
                            placeholder="Enter last name"
                            className="form-style"
                            autoComplete="off"
                        />
                    </Form.Item>
                </Space>                
                <Form.Item 
                    name="email"
                    label={
                        <Title
                            style={{ color: "#F1F2FF", fontSize: "0.875rem" }}
                        >
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
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item 
                    name="username"
                    label={
                        <Title
                            style={{ color: "#F1F2FF", fontSize: "0.875rem" }}
                        >
                            Username
                        </Title>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!"
                        }
                    ]}
                >
                    <Input
                        placeholder="Enter username"
                        className="form-style w-full"
                        autoComplete="off"
                    />
                </Form.Item>
                <Space className="flex gap-x-4">
                    <Form.Item 
                        name="password"
                        label={
                            <Title
                                style={{ color: "#F1F2FF", fontSize: "0.875rem" }}
                            >
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
                            placeholder="Enter password"
                            className="form-style"
                            autoComplete="password"
                            iconRender={(visible) => 
                                visible ? (
                                    <FiEye style={{ color: "#AFB2BF", cursor: "pointer" }}/>
                                ) : (
                                    <FiEyeOff style={{ color: "#6E727F", cursor: "pointer" }}/>
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="passwordConfirm"
                        label={
                            <Title
                                style={{ color: "#F1F2FF", fontSize: "0.875rem" }}
                            >
                                Confirm Password
                            </Title>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input again Password!"
                            }
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter confirm password"
                            className="form-style"
                            autoComplete="passwordConfirm"
                            iconRender={(visible) =>
                                visible ? (
                                    <FiEye style={{ color: '#6E727F', cursor: "pointer" }} />
                                ) : (
                                    <FiEyeOff style={{ color: '#6E727F', cursor: "pointer" }} />
                                )
                            }
                        />
                    </Form.Item>
                </Space>
                <Form.Item name="agreedToTerms" valuePropName="checked" noStyle>
                    <Checkbox className="text-[#F1F2FF]" style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
                        I accept the <Link to="#">Terms and Conditions!</Link>
                    </Checkbox>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="form-btn bg-orange-10"
                >
                    Create Account
                </Button>
                <div className="flex justify-center text-richblack-5 mt-4">
                    Already have an account? &nbsp;
                    <Link to="/login">
                        <p className="text-orange-10 hover:text-richblack-5">
                            Login!
                        </p>
                    </Link>
            </div>
            </Form>
        </>
    );
};

export default SignUpForm;
