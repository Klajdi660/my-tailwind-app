import { FunctionComponent } from "react";
import { Badge } from "antd";
import { CartItem, CartFooter } from "../Cart";
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
    setCheckoutOpen,
    setSelectedHeaderOpen,
    selectedHeaderOpen,
  } = props;

  const allSelections = selections.length;

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-main flex flex-col">
      {selectedHeaderOpen ? (
        <div
          className="flex_justify_between w-full px-6 pt-2 text-onNeutralBg bg-primary-opacity rounded-t-[2rem] cursor-pointer"
          onClick={() => setSelectedHeaderOpen(false)}
        >
          <p className="flex items-center gap-2 text-base font-semibold py-2">
            Selected items
            <Badge count={allSelections} showZero color="var(--primary)" />
          </p>
          <div
            className="bg-switch rounded p-1 hover:bg-primary-opacity"
            onClick={() => setSelectedHeaderOpen(false)}
          >
            <Icon name="MdClear" size={14} />
          </div>
        </div>
      ) : (
        <div className="flex_justify_between w-full px-6 pt-2 text-onNeutralBg">
          <p className="text-base font-semibold py-2">Ship to</p>
          <div className="flex items-center gap-2">
            <Icon name="SlLocationPin" size={14} />
            Albania
          </div>
        </div>
      )}
      <div className="switch_body_scroll w-full p-4 flex flex-col gap-3 overflow-y-scroll hide_scrollbar">
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
            setSelectedHeaderOpen={setSelectedHeaderOpen}
          />
        ))}
      </div>
      <CartFooter
        setCheckoutOpen={setCheckoutOpen}
        cartItems={cart}
        quantities={quantities}
      />
    </div>
  );
};
