import { Fragment, FunctionComponent, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, ImgUploader, Icon } from "../UI";
import { FormProps2, ErrorMessageProps, FormListItem } from "../../types";
import { classNames } from "../../utils";

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
      {message && (
        <p className="text-xs text-red-500 flex flex-row items-center mt-2">
          <Icon
            name="PiWarningCircleBold"
            size={18}
            className="mr-1 text-red-500"
          />
          {message}
        </p>
      )}
    </>
  );
};

export const Form: FunctionComponent<FormProps2> = (props) => {
  const {
    lists,
    onSubmit,
    schema,
    defaultValues,
    // files,
    // setFiles,
    hasProvider,
    user,
    data,
  } = props;
  const [showPass, setShowPass] = useState(null);
  const imageRef = useRef(null);

  const [{ formType, formName, btnTxt }] = lists;

  const {
    register: form,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const btnTitle = !data?.resetPassEmailSent ? btnTxt : "Resend Email";

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {!data?.resetPassEmailSent ? (
        <>
          {lists.map((list: FormListItem, index: number) => {
            return (
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
                    <div
                      className={classNames(
                        "relative",
                        !errors[list.name] &&
                          "border rounded border-divider focus-within:border-primary"
                      )}
                    >
                      {list.type === "input" && (
                        <div className="flex items-center justify-between">
                          <input
                            {...form(list.name)}
                            className={classNames(
                              "w-full h-10 px-2 rounded text-sm bg-transparent text-onNeutralBg no-focus border-divider outline-0 disabled:text-secondary",
                              errors[list.name] && "border border-red-500"
                            )}
                            {...list.props}
                            placeholder={list.props.placeholder || list.label}
                            disabled={list.props.disabled}
                            type={
                              ["password", "confirmPassword"]?.includes(
                                list.props.type
                              )
                                ? showPass?.[list.name]
                                  ? "text"
                                  : "password"
                                : list.props.type
                            }
                            autoComplete={formName !== "login" ? "off" : "on"}
                          />
                          {["password", "confirmPassword"]?.includes(
                            list.props.type
                          ) && (
                            <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                              {!list.props.disabled && (
                                <IconButton
                                  name={
                                    !showPass?.[list.name]
                                      ? "AiOutlineEyeInvisible"
                                      : "AiOutlineEye"
                                  }
                                  iconClassName="text-secondary hover:text-onNeutralBg"
                                  onClick={() =>
                                    setShowPass((prevS: any) => ({
                                      ...prevS,
                                      [list.name]: !prevS?.[list.name],
                                    }))
                                  }
                                />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <ErrorMessage errorMessage={errors?.[list.name]?.message} />
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
                      imgUrl={defaultValues.image}
                      hasProvider={hasProvider}
                      name={`${user?.extra?.firstName} ${user?.extra?.lastName}`}
                      username={user?.username}
                      //   onImageDelete={() => {}}
                      // imageRef={imageRef}
                      // containerDims="h-36 w-36"
                      // borderType="rounded-full"
                    />
                    <ErrorMessage />
                  </fieldset>
                )}
              </Fragment>
            );
          })}
        </>
      ) : (
        <p className="text-base font-normal tracking-wider text-secondary">
          We have sent the reset email to your email {data?.resetPassEmail} to
          reset password.
        </p>
      )}
      {formName === "login" && (
        <div className="flex flex-1 items-center">
          <input
            type="checkbox"
            // id="remember"
            {...form("remember")}
            name="remember"
            // value="remember"
          />
          <label className="ml-2 text-xs text-secondary">Remember Me</label>
          <Link
            to="/forgot-password"
            className="ml-auto tex-right text-xs text-onNeutralBg"
          >
            <p className="text-primary hover:underline underline-offset-2">
              Forgot Password!
            </p>
          </Link>
        </div>
      )}
      <div className="flex items-center justify-end w-full hover:brightness-110">
        <Button
          type="submit"
          label={btnTitle}
          variant="contained"
          className={classNames(formType === "auth" ? "w-full" : "w-fit")}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
