import { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { classNames } from "../../utils";
import { FormListItem, FormProps } from "../../types";
import { Button, ErrorFormMessage, IconButton } from "../../components";

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

  const btnTitle = data?.resetPassEmailSent ? "Resend Email" : btnTxt;

  const handelFormCancel = () => {
    reset();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {!data?.resetPassEmailSent &&
        listForm.map((list: FormListItem, index: number) => (
          <Fragment key={index}>
            {["input", "textarea"].includes(list.type) && (
              <fieldset>
                <div
                  className={classNames(
                    "relative rounded",
                    errors[list.name]
                      ? "border border-red-500 hover:border-red-500"
                      : "border border-divider focus-within:border-primary",
                    !list.props.disabled
                      ? "hover:border-primary"
                      : "bg-main border-transparent"
                  )}
                >
                  {list.type === "input" && (
                    <div className="flex items-center justify-between">
                      <input
                        {...form(list.name)}
                        className={classNames(
                          "w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                        )}
                        {...list.props}
                        placeholder={list.props.placeholder}
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
                          iconClassName={classNames(
                            "text-secondary",
                            ["password", "confirmPassword"]?.includes(
                              list.props.type
                            ) &&
                              !list.props.disabled &&
                              "hover:text-onNeutralBg hover:scale-[1.1]"
                          )}
                          onClick={() =>
                            setShowPass((prevS: any) => ({
                              ...prevS,
                              [list.name]: !prevS?.[list.name],
                            }))
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>
                <ErrorFormMessage errorMessage={errors?.[list.name]?.message} />
              </fieldset>
            )}
          </Fragment>
        ))}
      {data?.resetPassEmailSent && (
        <p className="text-base font-normal tracking-wider text-secondary text-center">
          We have sent the reset email to your email
          <span className="text-onNeutralBg font-semibold mx-2">
            {data?.resetPassEmail}
          </span>
          to reset password.
        </p>
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
            onClick={handelFormCancel}
          />
        )}
        <Button
          type="submit"
          label={btnTitle}
          variant="contained"
          className={classNames(
            "flex items-center justify-center gap-2",
            formType === "auth" ? "w-full" : "w-fit"
          )}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
