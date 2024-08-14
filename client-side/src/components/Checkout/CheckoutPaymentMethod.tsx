import { FC } from "react";
import { mobileMoneyImg, bankImg } from "../../assets";
import { classNames } from "../../utils";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { Image } from "../UI";

interface CheckoutPaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
}

export const CheckoutPaymentMethod: FC<CheckoutPaymentMethodProps> = (
  props
) => {
  const { paymentMethod, setPaymentMethod } = props;

  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Radio.Group
      defaultValue="bank"
      onChange={onChange}
      className="flex_justify_between w-full my-3 p-3 gap-4"
    >
      <Radio
        value="mobile_money"
        className={classNames(
          "flex_justify_between px-4 py-2 rounded-full hover:bg-primary-opacity",
          paymentMethod === "mobile_money" && "bg-primary-opacity"
        )}
      >
        <Image imgUrl={mobileMoneyImg} name="momo_img" width={150} />
      </Radio>
      <Radio
        value="bank"
        className={classNames(
          "flex_justify_between py-2 px-4 rounded-full hover:bg-primary-opacity",
          paymentMethod === "bank" && "bg-primary-opacity"
        )}
      >
        <Image imgUrl={bankImg} name="bank_img" width={150} />
      </Radio>
    </Radio.Group>
  );
};
