import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

export const ForgotPasswordForm: FunctionComponent = () => {
    const navigate = useNavigate();

    const handleOnSubmit = async (value: string) => {
        console.log('value :>> ', value);
        navigate("/update-password");
    };

    return (
        <Form
            onFinish={handleOnSubmit}
            className="flex flex-col gap-5"
            layout="vertical"
            initialValues={{
                remember: false
            }}
        >
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
                        message: "Please input your Email address!"
                    }
                ]}
            >
                <Input
                    placeholder="Email Address"
                    className="w-full h-10"
                    autoComplete="email"
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="h-10 bg-primary"
            >
                Send Email
            </Button>
            <div className="flex justify-center text-sm text-onNeutralBg">
                Remember Password! &nbsp;
                <Link to="/login">
                    <p className="text-primary hover:underline underline-offset-2">
                        Go back
                    </p>
                </Link>
            </div>
        </Form>
    );
};
