import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Space, Input, Button, Checkbox } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Tab } from "../UI";
import { accountTypes } from "../../constants";
import useAuthService from "../../services/AuthService";
import { RegisterUserInput } from "../../types/user.type";
import { useAuth } from "../../hooks";
import { toast } from "react-toastify";

export const SignUpForm: FunctionComponent = () => {
    // student or instructor
    const [accountType, setAccountType] = useState(accountTypes[0].tabName);
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
                tabData={accountTypes}
                field={accountType}
                setField={setAccountType}
            /> */}
            <Form 
                onFinish={handleOnSubmit} 
                layout="vertical"
                className="flex flex-col gap-5"
                initialValues={{
                    remember: false
                }}
            >
                <Space className="flex gap-x-4">
                    <Form.Item
                        name="firstName"
                        label={
                            <div className="text-xs font-semibold text-secondary">        
                                First Name
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input your First Name!"
                            }
                        ]}
                    >
                        <Input
                            placeholder="First Name"
                            className="h-10"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label={
                            <div className="text-xs font-semibold text-secondary">        
                                Last Name
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input your Last Name!"
                            }
                        ]}
                    >
                        <Input
                            placeholder="Last Name"
                            className="h-10"
                            autoComplete="off"
                        />
                    </Form.Item>
                </Space>                
                <Form.Item 
                    name="email"
                    label={
                        <div className="text-xs font-semibold text-secondary">
                            Email Address
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!"
                        }
                    ]}
                >
                    <Input
                        placeholder="Email Address"
                        className="w-full h-10"
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item 
                    name="username"
                    label={
                        <div className="text-xs font-semibold text-secondary">        
                            Username
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!"
                        }
                    ]}
                >
                    <Input
                        placeholder="Username"
                        className="w-full h-10"
                        autoComplete="off"
                    />
                </Form.Item>
                <Space className="flex gap-x-4">
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
                            className="h-10"
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
                            <div className="text-xs font-semibold text-secondary">        
                                Confirm Password
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input again Password!"
                            }
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            className="h-10"
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
                    <Checkbox className="text-secondary" style={{ fontSize: "12px", lineHeight: "16px" }}>
                        I accept the <Link to="#" className="text-primary hover:underline underline-offset-2">Terms and Conditions!</Link>
                    </Checkbox>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 bg-primary"
                >
                    Register
                </Button>
                <div className="flex justify-center text-sm text-onNeutralBg">
                    Already have an account? &nbsp;
                    <Link to="/login">
                        <p className="text-primary hover:underline underline-offset-2">
                            Login!
                        </p>
                    </Link>
                </div>
            </Form>
        </>
    );
};
