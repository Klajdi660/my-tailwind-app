import { FunctionComponent } from "react";
import { CartItem } from "../Cart";
import { Icon } from "../UI";
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
        <div className="flex_justify_between px-2 rounded bg-primary-opacity">
          <p className="text-base font-semibold py-2">Ship to</p>
          <div className="flex items-center gap-2">
            <Icon name="SlLocationPin" size={14} />
            Albania
          </div>
        </div>
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
            cartItems={cart}
          />
        ))}
      </ul>
    </div>
  );
};
