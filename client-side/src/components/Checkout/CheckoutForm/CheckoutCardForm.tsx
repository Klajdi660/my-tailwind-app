import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../UI";

interface CheckoutCardFormProps {
  totalPrice: string;
}

export const CheckoutCardForm: FC<CheckoutCardFormProps> = (props) => {
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
          htmlFor="name"
          className="font-semibold text-sm mb-1 text-secondary"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="name"
          {...form("name")}
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
          Card Number
        </label>
        <input
          type="text"
          id="number"
          {...form("cardnumber")}
          className="w-full h-10 bg-transparent text-sm text-onNeutralBg border-2 border-divider rounded px-2 focus-within:border-primary outline-0"
          placeholder="Enter your number"
          autoComplete="off"
        />
      </div>
      <div className="w-full flex justify-between gap-1 mb-4">
        <div className="flex flex-col ">
          <label
            htmlFor="number"
            className="font-semibold text-sm mb-1 text-secondary"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="text"
            {...form("expDate")}
            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border-2 border-divider rounded px-2 focus-within:border-primary outline-0"
            placeholder="MM/YY"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="number"
            className="font-semibold text-sm mb-1 text-secondary"
          >
            CVV
          </label>
          <input
            type="text"
            id="password"
            {...form("cvv")}
            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border-2 border-divider rounded px-2 focus-within:border-primary outline-0"
            placeholder="CVV"
            autoComplete="off"
          />
        </div>
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
