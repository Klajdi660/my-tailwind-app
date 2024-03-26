import { FunctionComponent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input } from "antd";
import { IconButton, Button } from "../UI";
import useAuthService from "../../services/AuthService";

export const ResetPasswordForm: FunctionComponent = () => {
  const { resetPassword } = useAuthService();
  const [form] = Form.useForm();
  const params = useParams();

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const { token } = params;

  const handleFormChange = () => {
    const values = form.getFieldsValue();

    const isEmpty = Object.values(values).some((value) => !value);

    setIsFormEmpty(isEmpty);
  };

  const handleOnSubmit = async (value: any) => {
    try {
      await resetPassword(value, token as string);
    } catch (error) {
      console.error("Reset Password Failed!", error);
    }
  };

  return (
    <Form
      form={form}
      onValuesChange={handleFormChange}
      onFinish={handleOnSubmit}
      layout="vertical"
      className="flex flex-col gap-5"
      initialValues={{
        remember: false,
      }}
    >
      <Form.Item
        name="password"
        label={
          <div className="text-xs font-semibold text-secondary">
            New Password
          </div>
        }
        rules={[
          {
            required: true,
            message: "Please input your New Password!",
          },
        ]}
      >
        <Input.Password
          placeholder="New Password"
          autoComplete="password"
          className="w-full h-10"
          iconRender={(visible) => (
            <IconButton
              name={visible ? "AiOutlineEye" : "AiOutlineEyeInvisible"}
              iconClassName="text-secondary hover:text-onNeutralBg"
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label={
          <div className="text-xs font-semibold text-secondary">
            Confirm New Password
          </div>
        }
        rules={[
          {
            required: true,
            message: "Please input New Password again!",
          },
        ]}
      >
        <Input.Password
          placeholder="Confirm New Password"
          className="w-full h-10"
          autoComplete="confirmPassword"
          iconRender={(visible) => (
            <IconButton
              name={visible ? "AiOutlineEye" : "AiOutlineEyeInvisible"}
              iconClassName="text-secondary hover:text-onNeutralBg"
            />
          )}
        />
      </Form.Item>
      <Button
        type="submit"
        label="Reset Password"
        variant="contained"
        disabled={isFormEmpty}
      />
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
