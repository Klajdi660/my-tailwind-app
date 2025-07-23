import { FC } from "react";
import {
  CheckoutCardForm,
  CheckoutFooter,
  CheckoutMomoForm,
  CheckoutPaymentMethod,
} from "../../components";
import { CheckoutBodyProps } from "../../types";

export const CheckoutBody: FC<CheckoutBodyProps> = (props) => {
  const { paymentMethod, setPaymentMethod, totalPrice } = props;

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-switch flex flex-col">
      <CheckoutPaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div className="min-h-[50vh] mt-5">
        {paymentMethod === "mobile_money" ? (
          <CheckoutMomoForm totalPrice={totalPrice} />
        ) : (
          <CheckoutCardForm totalPrice={totalPrice} />
        )}
      </div>
      <CheckoutFooter />
    </div>
  );
};
