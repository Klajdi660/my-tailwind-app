import { FC } from "react";
import { Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../UI";
import { CheckoutMomoFormPorps } from "../../../types";

const providerList = [
  {
    value: "MTN",
    label: "MTN Mobile Money",
  },
  {
    value: "airtel",
    label: "Airtel Tigo Money",
  },
  {
    value: "Vodafone",
    label: "Vodafone Cash",
  },
];

export const CheckoutMomoForm: FC<CheckoutMomoFormPorps> = (props) => {
  const { totalPrice } = props;

  const handleMenuClick = async (data: any) => {};

  const {
    register: form,
    handleSubmit,
    control,
  } = useForm({
    mode: "onTouched",
  });

  return (
    <form
      className="w-full p-1 px-4 rounded-lg flex flex-col"
      onSubmit={handleSubmit(handleMenuClick)}
    >
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="provider"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Provider
        </label>
        <Controller
          name="provider"
          control={control}
          // defaultValue={providerList[0].value}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full h-10 text-sm"
              placeholder="Select Provider"
              options={providerList}
            />
          )}
        />
      </div>
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="name"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Account Name
        </label>
        <input
          type="text"
          id="name"
          {...form("fullName")}
          className="w-full h-10 bg-transparent text-sm text-onNeutralBg border-2 border-divider rounded px-2 focus-within:border-primary outline-0"
          placeholder="Enter your name"
          autoComplete="off"
        />
      </div>
      <div className="w-full flex flex-col mb-4">
        <label
          htmlFor="number"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          MOMO Number
        </label>
        <input
          type="text"
          id="number"
          {...form("number")}
          className="w-full h-10 bg-transparent text-sm text-onNeutralBg border-2 border-divider rounded px-2 focus-within:border-primary outline-0"
          placeholder="Enter your number"
          autoComplete="off"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <p className="text-secondary">
          Amount Due:{" "}
          <span className="font-bold text-onNeutralBg">{`$${totalPrice}`}</span>{" "}
        </p>
      </div>
      <div className="w-full flex_justify_center mt-4 group">
        <Button
          label="Pay Now"
          variant="none"
          labelIcon="BiLock"
          className="w-[80%] bg-primary rounded-full text-white group-hover:opacity-70"
          iconClassName="text-white"
        />
      </div>
    </form>
  );
};
