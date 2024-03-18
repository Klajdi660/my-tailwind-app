import { Fragment, FunctionComponent, useRef, useState } from "react";
import { FormProps } from "../types/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Form: FunctionComponent<FormProps> = (props) => {
  const { lists, schema, defaultValues } = props;

  const [showPass, setShowPass] = useState(null);

  const {
    register: form,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form className="flex flex-col">
      {lists.map((list: any, index: any) => (
        <Fragment key={index}>
          {["input", "textarea"].includes(list.type) && (
            <div className="pb-[20px]">
              <div className="flex items-baseline justify-between">
                <label
                  className="mb-2 text-xs font-semibold text-secondary"
                  htmlFor={list?.name}
                >
                  {list?.label}
                </label>
              </div>
              {list.type === "input" && (
                <input
                  {...form(list.name)}
                  className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                  {...list.props}
                  placeholder={list.props.placeholder || list.label}
                  disabled={list.props.disabled}
                  type={
                    ["password", "confirmPassword"]?.includes(list.props.type)
                      ? showPass?.[list.name]
                        ? "text"
                        : "password"
                      : list.props.type
                  }
                />
              )}
            </div>
          )}
        </Fragment>
      ))}
    </form>
  );
};

export default Form;
