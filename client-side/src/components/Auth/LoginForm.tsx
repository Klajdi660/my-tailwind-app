import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Checkbox } from "antd";
// import { useAuthService } from "../../services";
import { useAuth } from "../../hooks";
import { IconButton, Button } from "../UI";
import { LoginUserInput, LoginFormProps } from "../../types";

// import { loginValidation } from "../../utils";
// import { yupResolver } from "@hookform/resolvers/yup";

export const LoginForm: FunctionComponent<LoginFormProps> = () => {
  // const { login } = useAuthService();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  useEffect(() => {
    if (isAuthenticated)
      localStorage.lastLocation
        ? navigate(`/${localStorage.lastLocation}`)
        : navigate("/discover");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = async (values: LoginUserInput) => {
    // const { username, password, remember } = values;
    // try {
    //   await login(username, password, remember);
    // } catch (error) {
    //   console.error("Failed to login!", error);
    // }
  };

  // const handleFormChange = () => {
  //   const values = form.getFieldsValue();
  //   // delete values.remember;
  //   // const isEmpty = Object.values(values).some((value) => !value);
  //   const { username, password } = values;
  //   const isEmpty = !username || !password;
  //   setIsFormEmpty(isEmpty);
  // };

  return (
    <Form
      onFinish={handleOnSubmit}
      form={form}
      layout="vertical"
      className="flex flex-col gap-5"
      initialValues={{
        remember: false,
        // username: "klajdi96",
        // password: "Klajdi96@",
      }}
      // onValuesChange={handleFormChange}
    >
      <Form.Item
        name="username"
        // label={
        //   <div className="text-xs font-semibold text-secondary">
        //     Email or Username
        //   </div>
        // }
        rules={[
          {
            required: true,
            message: "Please input your Email or Username!",
          },
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
        // label={
        //   <div className="text-xs font-semibold text-secondary">Password</div>
        // }
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          autoComplete="password"
          className="mb-0 w-full h-10"
          iconRender={(visible) => (
            <IconButton
              name={visible ? "AiOutlineEye" : "AiOutlineEyeInvisible"}
              iconClassName="text-secondary hover:text-onNeutralBg"
            />
          )}
        />
      </Form.Item>
      <div className="flex flex-1 items-center h-[30px]">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox
            className="text-secondary"
            style={{ fontSize: "12px", lineHeight: "16px" }}
          >
            Remember me
          </Checkbox>
        </Form.Item>
        <Link
          to="/forgot-password"
          className="ml-auto max-w-max text-xs text-right text-onNeutralBg"
        >
          <p className="text-xs text-primary hover:underline underline-offset-2">
            Forgot Password!
          </p>
        </Link>
      </div>
      <Button
        type="submit"
        label="Log in"
        variant="contained"
        // disabled={isFormEmpty}
        disabled={!submittable}
      />
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
