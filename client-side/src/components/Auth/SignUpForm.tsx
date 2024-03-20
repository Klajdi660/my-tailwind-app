import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Space, Input, Checkbox } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuthService from "../../services/AuthService";
import { RegisterUserInput } from "../../types/user.type";
import { useAuth } from "../../hooks";
import { toast } from "react-toastify";
import { Button } from "../UI";

export const SignUpForm: FunctionComponent = () => {
  // student or instructor
  const { signup } = useAuthService();
  const { setSignUpData } = useAuth();
  const [form] = Form.useForm();

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    const isEmpty = Object.values(values).some((value) => !value);

    setIsFormEmpty(isEmpty);
  };

  const handleOnSubmit = async (values: RegisterUserInput) => {
    try {
      const signupValues = {
        ...values,
      };

      setSignUpData(signupValues);

      await signup(values);
    } catch (error: any) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <>
      <Form
        onFinish={handleOnSubmit}
        form={form}
        layout="vertical"
        className="flex flex-col gap-5"
        initialValues={{
          remember: false,
        }}
        onValuesChange={handleFormChange}
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
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Email Address"
            className="w-full h-10"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          label={
            <div className="text-xs font-semibold text-secondary">
              Full Name
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input placeholder="Full Name" className="h-10" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="username"
          label={
            <div className="text-xs font-semibold text-secondary">Username</div>
          }
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
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
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="h-10"
              autoComplete="password"
              iconRender={(visible) =>
                visible ? (
                  <FiEye style={{ color: "#AFB2BF", cursor: "pointer" }} />
                ) : (
                  <FiEyeOff style={{ color: "#6E727F", cursor: "pointer" }} />
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
                message: "Please input again Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="h-10"
              autoComplete="passwordConfirm"
              iconRender={(visible) =>
                visible ? (
                  <FiEye style={{ color: "#6E727F", cursor: "pointer" }} />
                ) : (
                  <FiEyeOff style={{ color: "#6E727F", cursor: "pointer" }} />
                )
              }
            />
          </Form.Item>
        </Space>
        <div className="flex justify-center text-center">
          <p className="text-secondary">
            By signing up, you agree to our{" "}
            <span>
              <Link
                to="#"
                className="text-primary hover:underline underline-offset-2"
              >
                Terms
              </Link>
              ,{" "}
              <Link
                to="#"
                className="text-primary hover:underline underline-offset-2"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                to="#"
                className="text-primary hover:underline underline-offset-2"
              >
                Cookies Policy
              </Link>
              .
            </span>
          </p>
        </div>
        {/* <Form.Item name="agreedToTerms" valuePropName="checked" noStyle>
          <Checkbox
            className="text-secondary"
            style={{ fontSize: "12px", lineHeight: "16px" }}
          >
            I accept the{" "}
            <Link
              to="#"
              className="text-primary hover:underline underline-offset-2"
            >
              Terms and Conditions!
            </Link>
          </Checkbox>
        </Form.Item> */}
        <Button
          type="submit"
          label="Sign up"
          variant="contained"
          disabled={isFormEmpty}
        />
        <div className="flex justify-center text-sm text-onNeutralBg">
          Have an account? &nbsp;
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
