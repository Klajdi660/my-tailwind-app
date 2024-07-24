import { FunctionComponent } from "react";
import { CartItem, CartFooter } from "../Cart";
import { GameParams } from "../../types";

interface CartBodyProps {
  cart: GameParams[];
}

export const CartBody: FunctionComponent<CartBodyProps> = (props) => {
  const { cart } = props;

  return (
    <div className="switch_body">
      <ul
        //   className="flex flex-col w-full h-[340px] md:h-42 px-2 list-none overflow-y-scroll hide_scrollbar space-y-2"
        className="switch_body_scroll flex flex-col w-full px-2 list-none overflow-y-auto hide_scrollbar space-y-2"
      >
        {cart.map((item) => (
          <CartItem key={item.id} item={item} imageDims="16" />
        ))}
      </ul>
      <CartFooter />
    </div>
  );
};
