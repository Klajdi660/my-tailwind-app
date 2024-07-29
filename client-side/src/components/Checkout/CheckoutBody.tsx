import { FunctionComponent } from "react";
import { CheckoutPaymentMethod, CheckoutFooter } from "../Checkout";
import { Button } from "../UI";

interface CheckoutBodyProps {
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  totalPrice: string;
}

export const CheckoutBody: FunctionComponent<CheckoutBodyProps> = (props) => {
  const { paymentMethod, setPaymentMethod, totalPrice } = props;

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-main flex flex-col">
      <CheckoutPaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div className="min-h-[50vh] mt-5">
        <div className="w-full flex items-center justify-center my-2">
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
      </div>
      <CheckoutFooter />
    </div>
  );
};
