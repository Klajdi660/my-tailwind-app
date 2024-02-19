import { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { IconButton } from "../UI";

export const ResetPasswordForm: FunctionComponent = () => {
    const params = useParams();
    console.log('params :>> ', params);
    const handleOnSubmit = async (value: string) => {
        console.log('value :>> ', value);
    };

    return (
        <Form
            onFinish={handleOnSubmit}
            layout="vertical"
            className="flex flex-col gap-5"
            initialValues={{
                remember: false
            }}
        >
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
                    className="w-full h-10"
                    iconRender={(visible) => (
                        <IconButton
                            name={visible ? "AiFillEye" : "AiFillEyeInvisible"}
                            iconClassName="text-onNeutralBg"
                        />
                    )}
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
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
                    className="w-full h-10"
                    autoComplete="confirmPassword"
                    iconRender={(visible) => (
                        <IconButton
                            name={visible ? "AiFillEye" : "AiFillEyeInvisible"}
                            iconClassName="text-onNeutralBg"
                        />
                    )}
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="h-10 bg-primary"
            >
                Reset Password
            </Button>
            <div className="flex justify-center text-sm text-onNeutralBg">
                Remember Password? &nbsp;
                <Link to="/login">
                    <p className="text-primary hover:underline underline-offset-2">
                        Go back
                    </p>
                </Link>
            </div>
        </Form>
    );
};
