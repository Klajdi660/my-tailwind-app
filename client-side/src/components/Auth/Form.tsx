import { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorFormMessage } from "../Common";
import { Button, IconButton } from "../UI";
import { FormProps, FormListItem } from "../../types";
import { classNames } from "../../utils";

export const Form: FC<FormProps> = (props) => {
  const { listForm, onSubmit, schema, defaultValues, data } = props;

  const [showPass, setShowPass] = useState(null);

  const [{ formType, formName, btnTxt }] = listForm;

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const btnTitle = !data?.resetPassEmailSent ? btnTxt : "Resend Email";

  const handelFormCancle = () => {
    reset();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {!data?.resetPassEmailSent ? (
        <>
          {listForm.map((list: FormListItem, index: number) => {
            return (
              <Fragment key={index}>
                {["input", "textarea"].includes(list.type) && (
                  <fieldset>
                    <div
                      className={classNames(
                        "relative rounded",
                        errors[list.name]
                          ? "border border-red-500 hover:border-red-500"
                          : "border border-divider focus-within:border-primary hover:border-primary"
                      )}
                    >
                      {list.type === "input" && (
                        <div className="flex items-center justify-between">
                          <input
                            {...form(list.name)}
                            className={classNames(
                              "w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary"
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
                          <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                            {/* {!list.props.disabled && ( */}
                            <IconButton
                              name={
                                ["password", "confirmPassword"]?.includes(
                                  list.props.type
                                )
                                  ? showPass?.[list.name]
                                    ? "AiOutlineEyeInvisible"
                                    : "AiOutlineEye"
                                  : `${list.iconName}`
                              }
                              iconClassName={`text-secondary ${
                                ["password", "confirmPassword"]?.includes(
                                  list.props.type
                                ) && "hover:text-onNeutralBg hover:scale-[1.1]"
                              }`}
                              onClick={() =>
                                setShowPass((prevS: any) => ({
                                  ...prevS,
                                  [list.name]: !prevS?.[list.name],
                                }))
                              }
                            />
                            {/* )} */}
                          </span>
                        </div>
                      )}
                    </div>
                    <ErrorFormMessage
                      errorMessage={errors?.[list.name]?.message}
                    />
                  </fieldset>
                )}
              </Fragment>
            );
          })}
        </>
      ) : (
        <p className="text-base font-normal tracking-wider text-secondary">
          We have sent the reset email to your email
          <span className="text-onNeutralBg font-semibold mx-2">
            {data?.resetPassEmail}
          </span>
          to reset password.
        </p>
      )}
      {formName === "login" && (
        <div className="flex flex-1 items-center">
          {/* <input type="checkbox" {...form("remember")} name="remember" /> */}
          {/* <label className="ml-2 text-xs text-secondary">Remember Me</label> */}
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
      <div
        className={classNames(
          "flex items-center justify-end w-full",
          isValid && "hover:brightness-110",
          formName === "password" && "gap-4"
        )}
      >
        {formName === "password" && isValid && (
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            className="h-10"
            onClick={handelFormCancle}
          />
        )}
        <Button
          type="submit"
          label={btnTitle}
          variant="contained"
          className={classNames(
            "flex items-center justify-center gap-2 h-10",
            formType === "auth" ? "w-full" : "w-fit"
          )}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
