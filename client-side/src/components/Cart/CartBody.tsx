import { FunctionComponent, useState } from "react";
import { CartItem, CartFooter } from "../Cart";
import { GameParams } from "../../types";

interface CartBodyProps {
  cart: GameParams[];
  isEditing: boolean;
  selections: number[];
  setSelections: (selections: number[]) => void;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
}

export const CartBody: FunctionComponent<CartBodyProps> = (props) => {
  const { cart, isEditing, selections, setSelections, setCheckoutOpen } = props;

  return (
    <div className="switch_body">
      <ul className="switch_body_scroll flex flex-col w-full px-2 list-none overflow-y-auto hide_scrollbar">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            imageDims="16"
            isEditing={isEditing}
            selections={selections}
            setSelections={setSelections}
          />
        ))}
      </ul>
      <CartFooter setCheckoutOpen={setCheckoutOpen} />
    </div>
  );
};
