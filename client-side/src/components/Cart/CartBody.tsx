import { FunctionComponent } from "react";
import { CartItem } from "../Cart";
import { CartBodyProps } from "../../types";

export const CartBody: FunctionComponent<CartBodyProps> = (props) => {
  const {
    cart,
    isEditing,
    selections,
    setSelections,
    quantities,
    setQuantities,
  } = props;

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
            quantities={quantities}
            setQuantities={setQuantities}
          />
        ))}
      </ul>
    </div>
  );
};
