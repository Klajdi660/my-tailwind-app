import { FunctionComponent } from "react";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";

interface GeneralSettingProps {}

const themeOptions = [
  { value: "Dark", label: "Dark" },
  { value: "Light", label: "Light" },
];

const langOptions = [
  { value: "Albanian", label: "Albanian" },
  { value: "English", label: "English" },
];

export const GeneralSetting: FunctionComponent<GeneralSettingProps> = (
  props
) => {
  const {
    register: form,
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
  });

  return (
    <form className="w-full flex flex-col gap-4">
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Theme
        </label>
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              // variant="borderless"
              className="h-10 w-52 text-sm"
              placeholder="Select theme"
              options={themeOptions}
            />
          )}
        />
      </div>
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Language
        </label>
        <Controller
          name="lang"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="h-10 w-52 text-sm"
              placeholder="Select language"
              options={langOptions}
            />
          )}
        />
      </div>
    </form>
  );
};
