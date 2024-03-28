import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import { Button, Icon } from "../UI";
import useAuthService from "../../services/AuthService";

export const ForgotPasswordForm: FunctionComponent = () => {
  const { forgotPassword } = useAuthService();
  const [form] = Form.useForm();

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    const isEmpty = !values.email;
    setIsFormEmpty(isEmpty);
  };

  const handleOnSubmit = async (value: any) => {
    try {
      await forgotPassword(value);
    } catch (error) {
      console.error("Forgot Password Failed!", error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleOnSubmit}
      onValuesChange={handleFormChange}
      className="flex flex-col gap-5"
      layout="vertical"
      initialValues={{
        remember: false,
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
            message: "Please input your Email address!",
          },
        ]}
      >
        <Input
          prefix={<Icon name="AiOutlineLock" />}
          placeholder="Email Address"
          className="w-full h-10"
          autoComplete="email"
        />
      </Form.Item>
      <Button
        type="submit"
        label="Send Email"
        variant="contained"
        disabled={isFormEmpty}
      />
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
