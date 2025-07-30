import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidation, classNames, phonePrefixData } from "../../utils";
import { FormValuesTypes, FormProps } from "../../types";
import { Button, ErrorFormMessage, IconButton } from "../../components";
import { formData, userRegex } from "../../data";
import { Select } from "antd";

export const Form: FC<FormProps> = (props) => {
  const { nameForm, onSubmit } = props;

  const { isPhoneNumberRegex } = userRegex;
  const { metadata, inputMetadata } = formData[nameForm];
  const { buttonName } = metadata;

  const [phonePrefix, setPhonePrefix] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identifierValue, setIdentifierValue] = useState<string>("");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleFormSubmit = (values: FormValuesTypes) => {
    onSubmit({ ...values, phonePrefix });
  };

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
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
            {item.name === "identifier" &&
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
                item.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : item.type
              }
              {...form(item.name)}
              autoComplete="on"
              onChange={(e) => {
                form(item.name).onChange(e);
                if (item.name === "identifier") {
                  setIdentifierValue(e.target.value);
                }
              }}
            />
            <span
              className={classNames(
                "absolute right-2 top-[50%] translate-y-[-50%]",
                "opacity-0 pointer-events-none transition-opacity duration-200",
                "focus-within:opacity-100 focus-within:pointer-events-auto"
              )}
            >
              {item.name === "password" && (
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
