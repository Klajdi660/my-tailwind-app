import { FunctionComponent } from "react";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { CartItem, CartFooter } from "../Cart";
import { Icon } from "../UI";
import { CartBodyProps } from "../../types";

export const CartBody: FunctionComponent<CartBodyProps> = (props) => {
  const {
    cart,
    isEditing,
    selections,
    quantities,
    setQuantities,
    selectedHeaderOpen,
    setSelections,
    setCheckoutOpen,
    setSelectedHeaderOpen,
  } = props;

  const { userSelectedData } = useSelector(
    (state: any) => state.userSelectedData
  );

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
        <>
          {userSelectedData && (
            <div className="flex_justify_between w-full px-6 pt-2 text-onNeutralBg">
              <p className="text-base font-semibold py-2">Ship to</p>
              <div className="flex items-center gap-2">
                <Icon name="SlLocationPin" size={14} />
                {userSelectedData.name}
              </div>
            </div>
          )}
        </>
      )}
      <div className="switch_body_scroll w-full p-4 flex flex-col gap-3 overflow-y-scroll hide_scrollbar">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            imageDims="16"
            cartItems={cart}
            isEditing={isEditing}
            selections={selections}
            quantities={quantities}
            setQuantities={setQuantities}
            setSelectedHeaderOpen={setSelectedHeaderOpen}
            setSelections={setSelections}
          />
        ))}
      </div>
      <CartFooter
        cartItems={cart}
        quantities={quantities}
        setCheckoutOpen={setCheckoutOpen}
      />
    </div>
  );
};
