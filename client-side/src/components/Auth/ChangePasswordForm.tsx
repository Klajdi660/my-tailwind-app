import { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Typography, Input } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const { Title } = Typography;

const ChangePasswordForm: FunctionComponent = () => {
    const params = useParams();
    console.log('params :>> ', params);
    const handleOnSubmit = async (value: string) => {
        console.log('value :>> ', value);
    };

    return (
        <Form
            onFinish={handleOnSubmit}
            className="mt-4"
            layout="vertical"
            initialValues={{
                remember: false
            }}
        >
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
                    placeholder="Enter password"
                    autoComplete="password"
                    className="form-style w-full"
                    iconRender={(visible) =>
                        visible ? (
                            <FiEye style={{ color: '#6E727F', cursor: "pointer" }} />
                        ) : (
                            <FiEyeOff style={{ color: '#6E727F', cursor: "pointer" }} />
                        )
                    }
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
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
                    autoComplete="confirmPassword"
                    iconRender={(visible) =>
                        visible ? (
                            <FiEye style={{ color: '#6E727F', cursor: "pointer" }} />
                        ) : (
                            <FiEyeOff style={{ color: '#6E727F', cursor: "pointer" }} />
                        )
                    }
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="form-btn bg-orange-10"
            >
                Reset Password
            </Button>
            <Link to="/login" className="ml-auto max-w-max text-base text-start text-richblack-5">
                <p className="mt-4 flex flex-row items-center hover:text-orange-5">
                    <HiChevronDoubleLeft className="mr-2" size={20}/>
                    Back to Login
                </p>
            </Link>
        </Form>
    );
};

export default ChangePasswordForm;
