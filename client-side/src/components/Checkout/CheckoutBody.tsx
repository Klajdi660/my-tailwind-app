import { FunctionComponent } from "react";
import { CheckoutPaymentMethod, CheckoutFooter } from "../Checkout";
import { CheckoutCardForm, CheckoutMomoForm } from "./CheckoutForm";

interface CheckoutBodyProps {
  totalPrice: string;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
}

export const CheckoutBody: FunctionComponent<CheckoutBodyProps> = (props) => {
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
