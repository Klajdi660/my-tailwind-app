import { Select, Popover } from "antd";
import { FunctionComponent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Icon, Image, Button } from "../UI";
import { bankImg } from "../../assets";
import { currencyList } from "../../data";

interface PaymentSettingProps {}

const EditCardContent: FunctionComponent = () => {
  return (
    <div className="p-2 min-w-[300px]">
      <p className="text-onNeutralBg">Test</p>
    </div>
  );
};

const content = (
  <div className="flex_justify_center flex-row cursor-pointer gap-1 group">
    <Icon
      name="AiOutlineDelete"
      size={16}
      className="group-hover:text-primary"
    />
    <p className="text-secondary group-hover:text-primary">Remove card</p>
  </div>
);

export const PaymentSetting: FunctionComponent<PaymentSettingProps> = (
  props
) => {
  const currencyOptions = Object.keys(currencyList).map((curr) => ({
    label: currencyList[curr].label,
    value: curr,
  }));

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
          Currency
        </label>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              // variant="borderless"
              className="h-10 w-52 text-sm"
              placeholder="Select currency"
              dropdownStyle={{ width: 200 }}
              options={currencyOptions}
            />
          )}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Cards
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 grid grid-cols-2 gap-4 p-4 bg-primary-opacity rounded-lg text-onNeutralBg">
            <div className="flex items-start justify-start">
              <p className="text-lg font-bold">**** 7247</p>
            </div>
            <div className="flex items-start justify-end">
              <Image imgUrl={bankImg} name="bank_img" width={80} />
            </div>
            <div></div>
            <div className="flex items-end justify-end cursor-pointer">
              <Popover arrow={false} content={content}>
                <Button
                  labelIcon="BsThreeDots"
                  variant="none"
                  // className="px-0 py-0 hover:bg-primary-opacity w-8"
                  className="px-0 py-0"
                  iconClassName="hover:text-primary"
                />
              </Popover>
            </div>
          </div>
          <div className="h-32 flex_justify_center flex-row gap-2 bg-primary-opacity rounded-lg cursor-pointer group text-onNeutralBg">
            <Icon
              name="MdOutlineAddCircleOutline"
              size={20}
              className="group-hover:text-primary"
            />
            <p className="text-lg font-semibold group-hover:text-primary">
              Add new card
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
