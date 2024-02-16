import { Fragment, FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OtpInput from "react18-input-otp";
import { logo } from "../../constants";
import { FormListItem } from "../../types/general.type";
import { Button, IconButton, Icons, Title, SocialAuthButton } from "../UI";

interface FormProps {
    lists: FormListItem[];
    onSubmit?: any;
    schema?: any;
};

const FormMessage = ({ errorMessage }: any) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
        {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </>
  );
};

export const Form: FunctionComponent<FormProps> = (props) => {
    const { lists, onSubmit, schema } = props;

    const [showPass, setShowPass] = useState(null);
    const [code, setCode] = useState<string>("");
    const [otpFilled, setOtpFilled] = useState(false);

    const [{ formName, formTitle, footerTitle, footerLink, linkTo, btnTxt }] = lists;
    const pathname = formName.toLowerCase();

    const {
        register: form,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });    

    const handleOtpChange = async (code: string) => {
        console.log("OTP Code Changed:", code);
        setCode(code);
        setOtpFilled(code.length === 6);
        console.log("Is OTP Filled:", code.length === 6);
    };
    console.log('isValid :>> ', isValid);
    return (
        <>
            <div className="flex flex-col items-center mb-6 lg:mb-6">
                <Link
                    to="/"
                    className="flex flex-row items-center gap-1 m-0 logo"                
                >
                    <Icons
                        name={logo.icon}
                        className="!text-primary"
                        size={20}
                    />
                    <h1 className="text-[20px] text-primary font-bold">
                        {logo.name}
                    </h1>
                </Link>
            </div>
            <Title 
                name={formTitle || ""}
                desc="to continue to Groove"
                type="medium"
            />
            {["register", "login"]?.includes(pathname) && (
                <>
                    <SocialAuthButton />
                    <div className="flex items-center justify-center gap-4 my-6 divider">
                        <div className="h-[1px] bg-divider flex-1" />
                        <span className="text-sm text-onNeutralBg">or</span>
                        <div className="h-[1px] bg-divider flex-1" />
                    </div>
                </>
            )}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                {pathname === "verify-email" && <div className="relative px-2 py-1 border rounded border-divider focus-within:border-primary">
                    <OtpInput
                        value={code}
                        onChange={handleOtpChange}
                        numInputs={6}
                        separator={<span style={{ width: "10px" }}></span>}
                        // isInputNum={true} only number
                        shouldAutoFocus={true}
                        inputStyle={{
                            // border: "transparent",
                            border: "1px solid red",
                            borderRadius: "8px",
                            boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.5)",
                            // background: "#2C333F",
                            width: "54px",
                            height: "54px",
                            fontSize: "12px",
                            color: "black",
                            fontWeight: "400",
                        }}
                        focusStyle={{
                            border: "1px solid #EB6536",
                            outline: "none"
                        }}
                    />
                </div>}
                {lists.map((list, index) => (
                    <Fragment key={index}>
                        {["input", "textarea"].includes(list.type) && (
                            <fieldset>
                                <div className="flex items-baseline justify-between">
                                    <label
                                        className="mb-2 text-xs font-semibold text-secondary"
                                        htmlFor={list?.name}
                                    >
                                        {list?.label}
                                    </label>
                                </div>
                                <div className="relative px-2 py-1 border rounded border-divider focus-within:border-primary">
                                    {list.type === "input" && (
                                        <div className="flex items-center justify-between">
                                            <input
                                                {...form(list.name)}
                                                className="w-full h-10 text-sm bg-transparent text-onNeutralBg no-focus border-divider outline-0 disabled:text-secondary"
                                                {...list.props}
                                                placeholder={
                                                    list.props.placeholder || list.label
                                                }
                                                // disabled={list.props.disabled || isSubmitting}
                                                type={
                                                    ["password", "confirmPassword"]?.includes(list.props.type)
                                                        ? showPass?.[list.name]
                                                        ? "text"
                                                        : "password"
                                                        : list.props.type
                                                }
                                            />
                                            {["password", "confirmPassword"]?.includes(list.props.type) && (
                                                <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                                                    <IconButton
                                                        name={
                                                        !showPass?.[list.name]
                                                            ? "AiFillEyeInvisible"
                                                            : "AiFillEye"
                                                        }
                                                        iconClassName="text-onNeutralBg"
                                                        onClick={() =>
                                                            setShowPass((prevS: any) => ({
                                                                ...prevS,
                                                                [list.name]: !prevS?.[list.name],
                                                            }))
                                                        }
                                                    />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormMessage errorMessage={errors?.[list.name]?.message} />
                            </fieldset>
                        )}
                    </Fragment>
                ))}
                <div className="flex items-center justify-start w-full hover:brightness-110">
                    <Button 
                        type="submit"
                        label={btnTxt}
                        variant="contained"
                        className="w-full"
                        disabled={pathname === "verify-email" ? !otpFilled : !isValid}
                        onClick={() => handleSubmit(onSubmit)}
                    />
                </div>  
            </form>
            <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-onNeutralBg">
                {pathname === "login" && (
                    <div>
                        Forgot Password?{" "}
                        <Link
                            to="/forgot-password"
                            className="text-primary hover:underline underline-offset-2"
                        >
                            Reset
                        </Link>
                    </div>
                )}
                <div>
                    {footerTitle}{" "}
                    <Link
                        to={linkTo}
                        className="text-primary hover:underline underline-offset-2"
                    >
                        {footerLink}
                    </Link>
                </div>
            </div>
        </>
    );
};
