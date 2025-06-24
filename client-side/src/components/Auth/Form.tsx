import { phone } from "phone";
import { useForm } from "react-hook-form";
import { FC, Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorFormMessage, Button, IconButton } from "../../components";
import { FormProps, FormListItem } from "../../types";
import { classNames } from "../../utils";

export const Form: FC<FormProps> = (props) => {
  const { listForm, onSubmit, schema, defaultValues, data } = props;

  const [showPass, setShowPass] = useState<null>(null);
  const [identifier, setIdentifier] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const [{ formType, formName, btnTxt }] = listForm;
  const btnTitle = data?.resetPassEmailSent ? "Resend Email" : btnTxt;
  const isPhoneNumberValid = phone(phoneNumber).isValid;

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
    shouldUnregister: false,
  });

  const detectMethod = (value: string) => {
    setIdentifier(value);

    if (/^[\d+]/.test(value)) {
      setSelectedMethod("mobile");
      setValue("mobile", value, { shouldValidate: true });
      setPhoneNumber(value);
      setValue("email", "", { shouldValidate: true });
    } else if (value.includes("@")) {
      setSelectedMethod("email");
      setValue("email", value, { shouldValidate: true });
      setValue("mobile", "", { shouldValidate: true });
      setPhoneNumber("");
    } else {
      setSelectedMethod(null);
      setValue("email", "", { shouldValidate: true });
      setValue("mobile", "", { shouldValidate: true });
      setPhoneNumber("");
    }

    setValue("identifier", value, { shouldValidate: true });
  };

  const handelFormCancel = () => {
    reset();
    setIdentifier("");
    setPhoneNumber("");
    setSelectedMethod(null);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      {!data?.resetPassEmailSent && formName === "register" && (
        <fieldset>
          <div
            className={classNames(
              "relative rounded",
              errors.identifier || errors.email || errors.mobile
                ? "border border-red-500 hover:border-red-500"
                : "border border-divider focus-within:border-primary hover:border-primary"
            )}
          >
            <input
              {...form("identifier")}
              value={identifier}
              onChange={(e) => detectMethod(e.target.value)}
              className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 rounded"
              placeholder="Email or Phone Number"
              autoComplete="off"
            />
            <span className="absolute right-2 top-[50%] translate-y-[-50%]">
              <IconButton name="AiOutlineUser" iconClassName="text-secondary" />
            </span>
          </div>
          <ErrorFormMessage
            errorMessage={
              errors?.identifier?.message ||
              errors?.email?.message ||
              errors?.mobile?.message ||
              (selectedMethod === "mobile" &&
                (!phoneNumber.startsWith("+")
                  ? "Please add the prefix, e.g. +1"
                  : !isPhoneNumberValid && "Please enter a valid phone number"))
            }
          />
        </fieldset>
      )}

      {listForm
        .filter(
          (list: FormListItem) => !["email", "mobile"].includes(list.name)
        )
        .map((list: FormListItem, index: number) => (
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
                    <div
                      className={classNames(
                        "flex items-center justify-between gap-2",
                        list.name === "mobile" && "pl-1"
                      )}
                    >
                      <input
                        {...form(list.name)}
                        className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
                        {...list.props}
                        placeholder={list.props.placeholder}
                        disabled={list.props.disabled}
                        type={
                          ["password", "confirmPassword"].includes(
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
                            ["password", "confirmPassword"].includes(
                              list.props.type
                            )
                              ? showPass?.[list.name]
                                ? "AiOutlineEyeInvisible"
                                : "AiOutlineEye"
                              : `${list.iconName}`
                          }
                          iconClassName={classNames(
                            "text-secondary",
                            ["password", "confirmPassword"].includes(
                              list.props.type
                            ) &&
                              !list.props.disabled &&
                              "hover:text-onNeutralBg hover:scale-[1.1]"
                          )}
                          onClick={() =>
                            setShowPass((prev: any) => ({
                              ...prev,
                              [list.name]: !prev?.[list.name],
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
          "flex items-center justify-end w-full mt-6",
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
