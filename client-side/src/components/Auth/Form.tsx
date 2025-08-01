import { Select } from "antd";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "../../hooks";
import { formData, userRegex } from "../../data";
import { FormValuesTypes, FormProps, FormFieldName } from "../../types";
import { Button, ErrorFormMessage, IconButton } from "../../components";
import { formValidation, classNames, phonePrefixData } from "../../utils";

export const Form: FC<FormProps> = (props) => {
  const { nameForm, onSubmit } = props;

  const { isPhoneNumberRegex } = userRegex;
  const { metadata, inputMetadata } = formData[nameForm];
  const { buttonName } = metadata;

  const { setServiceResponse } = useStore();

  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identifierValue, setIdentifierValue] = useState<string>("");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleFormSubmit = (values: FormValuesTypes) => {
    onSubmit({ ...values, phonePrefix, reset });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: FormFieldName
  ) => {
    form(name).onChange(e);

    setServiceResponse({});

    if (name === "identifier") {
      setIdentifierValue(e.target.value);
    }
  };

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValuesTypes>({
    mode: "all",
    resolver: yupResolver(formValidation[nameForm]),
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {inputMetadata.map((item) => (
        <fieldset key={item.name}>
          <div
            className={classNames(
              "flex items-center relative rounded",
              errors[item.name]
                ? "border border-red-500"
                : "border border-divider focus-within:border-primary"
            )}
          >
            {["identifier"].includes(item.name) &&
              isPhoneNumberRegex.test(identifierValue) && (
                <Select
                  options={phonePrefixData.map(({ key, ...rest }) => ({
                    key,
                    ...rest,
                  }))}
                  optionLabelProp="selected"
                  className="contactNr-select bg-primary-opacity ml-2"
                  placeholder="Prefix"
                  dropdownStyle={{ width: 250 }}
                  onChange={(value) => setPhonePrefix(value)}
                />
              )}
            <input
              className="w-full h-12 px-2 text-sm text-onNeutralBg bg-transparent no-focus outline-0 disabled:text-secondary rounded"
              placeholder={item.placeholder}
              type={
                ["password", "confirmPassword"].includes(item.name)
                  ? showPassword
                    ? "text"
                    : "password"
                  : item.type
              }
              {...form(item.name)}
              autoComplete={["identifier"].includes(item.name) ? "on" : "off"}
              onChange={
                (e) => handleInputChange(e, item.name)
                //   {
                //   form(item.name).onChange(e);
                //   if (["identifier"].includes(item.name)) {
                //     setIdentifierValue(e.target.value);
                //   }
                // }
              }
            />
            <span
              className={classNames(
                "absolute right-2 top-[50%] translate-y-[-50%]",
                "opacity-0 pointer-events-none transition-opacity duration-200",
                "focus-within:opacity-100 focus-within:pointer-events-auto"
              )}
            >
              {["password", "confirmPassword"].includes(item.name) && (
                <IconButton
                  name={showPassword ? item.iconHidden : item.iconVisible}
                  iconClassName="text-secondary hover:text-onNeutralBg hover:scale-[1.1]"
                  onClick={toggleShowPassword}
                />
              )}
            </span>
          </div>
          <ErrorFormMessage errorMessage={errors?.[item.name]?.message} />
        </fieldset>
      ))}
      <Button
        className={classNames("mt-4", isValid && "hover:brightness-110")}
        type="submit"
        isSubmitting={true}
        label={buttonName}
        variant="contained"
        disabled={!isValid}
      />
    </form>
  );
};
