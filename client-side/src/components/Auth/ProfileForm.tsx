import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormProps, FormListItem } from "../../types";

export const ProfileForm: FC<FormProps> = (props) => {
  const { listForm, defaultValues } = props;

  const { register: form } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  return (
    <form className="flex flex-col">
      <div className="flex flex-wrap justify-between">
        {listForm.map((list: FormListItem, index: number) => {
          return (
            <div className="w-full md:w-[48%] mb-5" key={index}>
              <label
                className="block mb-2 text-xs font-semibold text-secondary"
                htmlFor={list?.name}
              >
                {list?.label}
              </label>
              <input
                {...form(list.name)}
                className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 disabled:text-secondary"
                {...list.props}
                placeholder={list.props.placeholder || list.label}
                disabled={true}
                type={list.props.type}
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};
