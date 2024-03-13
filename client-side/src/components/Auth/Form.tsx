import { Fragment, FunctionComponent, useState, useRef } from "react";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import OtpInput from "react18-input-otp";
// import { logo } from "../../constants";
import { FormListItem } from "../../types/general.type";
import { Button, IconButton, Icons, Title, SocialAuthButton, ImgUploader } from "../UI";

interface FormProps {
    lists: FormListItem[] | any;
    onSubmit?: any;
    schema?: any;
    defaultValues?: any;
    files?: any;
    setFiles?: any;
    hasProvider?: boolean; 
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
    const { lists, onSubmit, schema, defaultValues, files, setFiles, hasProvider } = props;
    const [showPass, setShowPass] = useState(null);
    const [code, setCode] = useState<string>("");
    const [otpFilled, setOtpFilled] = useState(false);
    const imageRef = useRef(null);

    const [{ formName, formTitle, footerTitle, footerLink, linkTo, btnTxt }] = lists;
    // const pathname = formName.toLowerCase();

    const {
        register: form,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues,
    });  

    // const handleOtpChange = async (code: string) => {
    //     setCode(code);
    //     setOtpFilled(code.length === 6);
    // };
  
    // const isButtonDisabled = pathname === "verify-email" ? !otpFilled : !isValid;

    return (
        <>
            {/* <div className="flex flex-col items-center mb-6 lg:mb-6">
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
            /> */}
            {/* {["register", "login"]?.includes(pathname) && (
                <>
                    <SocialAuthButton />
                    <div className="flex items-center justify-center gap-4 my-6 divider">
                        <div className="h-[1px] bg-divider flex-1" />
                        <span className="text-sm text-onNeutralBg">or</span>
                        <div className="h-[1px] bg-divider flex-1" />
                    </div>
                </>
            )} */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                {/* {pathname === "verify-email" && (
                    <OtpInput
                        value={code}
                        onChange={handleOtpChange}
                        numInputs={6}
                        separator={false}
                        shouldAutoFocus={true}
                        containerStyle={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "4px",
                        }}
                        inputStyle={{
                            width: "48px",
                            height: "48px",
                            margin: "0 5px",
                            fontSize: "18px",
                            textAlign: "center",
                            border: "1px solid #e5e5e5",
                            borderRadius: "5px",
                            outline: "none",
                        }}

                        focusStyle={{
                            border: "1px solid #0077B5",
                            outline: "none"
                        }}
                    />
                )} */}
                {lists.map((list: any, index: any) => (
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
                                                disabled={list.props.disabled}
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
                                                    {!list.props.disabled && <IconButton
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
                                                    />}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormMessage errorMessage={errors?.[list.name]?.message} />
                            </fieldset>
                        )}
                        {["image_dropzone"].includes(list.type) && (
                            <fieldset className="flex flex-col">
                                {list.label && (
                                    <label
                                        className="mb-2 text-sm font-semibold text-secondary"
                                        htmlFor={list.item}
                                    >
                                        {list.label || "Upload Image"}
                                    </label>
                                )}
                                <input 
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={imageRef}
                                />
                                <ImgUploader
                                    blobUrl={defaultValues.image}
                                    //   onImageDelete={() => {}}
                                    imageRef={imageRef}
                                    containerDims = "h-36 w-36"
                                    borderType = "rounded-full"            
                                />
                                {hasProvider && (
                                    <button className="w-36 h-8 mt-1 rounded flex_justify_center items-center bg-primary text-white hover:brightness-110">
                                        <Icons name="AiOutlineEdit" className="mr-1 text-white" size={18}/>
                                        Change photo
                                    </button>
                                )}
                                <FormMessage />
                            </fieldset>
                        )}
                    </Fragment>
                ))}
                {/* {pathname === "login" && (
                    <div className="flex flex-1 items-center">
                        <input type="checkbox" id="remember" name="remember" value="remember"/>
                        <label className="ml-2">Remember Me</label>
                        <div className="ml-auto max-w-max text-right">
                            <Link
                                to="/forgot-password"
                                className="text-onNeutralBg"
                            >
                                <p className="hover:underline underline-offset-2">Forgot Password!</p>
                            </Link>
                        </div>
                    </div>
                )} */}
                <div className="flex items-center justify-start w-full hover:brightness-110">
                    <Button 
                        type="submit"
                        label={btnTxt}
                        variant="contained"
                        // className="w-full"
                        className="w-fit"
                        // disabled={isButtonDisabled}
                        disabled={!isValid}
                        onClick={() => handleSubmit(onSubmit)}
                    />
                    {/* <Button 
                        className="w-full h-10 bg-primary" 
                        type="primary" 
                        htmlType="submit"
                        disabled={isButtonDisabled}
                        onClick={() => handleSubmit(onSubmit)}
                    >
                        {btnTxt}
                    </Button> */}
                </div>  
            </form>
            {/* <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-onNeutralBg"> */}
                {/* {pathname === "login" && (
                    <div>
                        Forgot Password?{" "}
                        <Link
                            to="/forgot-password"
                            className="text-primary hover:underline underline-offset-2"
                        >
                            Reset
                        </Link>
                    </div>
                )} */}
                {/* <div>
                    {footerTitle}{" "}
                    <Link
                        to={linkTo}
                        className="text-primary hover:underline underline-offset-2"
                    >
                        {footerLink}
                    </Link>
                </div>
            </div> */}
        </>
    );
};
