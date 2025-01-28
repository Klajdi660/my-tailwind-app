import { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../data";
import { Icon } from "../../components";
import { CartItemProps } from "../../types";
import { useCart, useNotification } from "../../hooks";
import { classNames, nameTruncate, calculateTotalPrice } from "../../utils";

export const CartItem: FC<CartItemProps> = (props) => {
  const {
    item,
    cartItems,
    isEditing,
    selections,
    quantities,
    setQuantities,
    setSelections,
    setSelectedHeaderOpen,
  } = props;
  const { id, name, slug, background_image, price } = item;
  const { gameDetail } = paths;

  const { removeGameFromCart } = useCart();
  const [notify] = useNotification();

  const { shipping } = calculateTotalPrice(cartItems, quantities);

  const handleIncrement = () => {
    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const handleDecrement = () => {
    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const handleRemoveFromCart = () => {
    removeGameFromCart(id);
    notify({
      variant: "success",
      description: "Game was delete from the cart",
    });
  };

  const hasOneSelect = selections.includes(id);

  const oneSelectGame = () => {
    const selectOne = hasOneSelect
      ? selections.filter((selectedId) => selectedId !== id)
      : [...selections, id];
    setSelections(selectOne);

    if (selectOne.length > 0) {
      setSelectedHeaderOpen(true);
    } else {
      setSelectedHeaderOpen(false);
    }
  };

  return (
    <div
      key={id}
      className={classNames(
        "relative w-full p-4 flex items-start text-base !text-onNeutralBg cursor-pointer gap-2 bg-primary-opacity rounded-lg"
      )}
    >
      <Link
        to={`${gameDetail}/${id}`}
        className="relative flex justify-center w-full items-center group"
      >
        <div className="flex items-center justify-start flex-1 gap-2 xs:gap-4">
          <div className="relative w-12 h-12">
            <div
              className={classNames(
                "absolute w-full h-full group-hover:bg-main group-hover:opacity-70 bg-transparent"
              )}
            />
            <img
              src={background_image}
              alt={slug}
              className={classNames("h-full w-full rounded aspect-square")}
            />
          </div>
          <div className="flex flex-col flex-1 w-full gap-1 text-onNeutralBg">
            <span className="text-base group-hover:text-primary">
              {nameTruncate(name, 20)}
            </span>
            <p className="flex text-sm text-secondary gap-1 group-hover:text-primary">
              <span className="text-red-600">$</span>
              {price}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex flex-col">
          <div className="flex gap-2 text-base font-semibold justify-end items-center">
            {" "}
            <Icon name="LiaCarSideSolid" size={20} />
            Shipping: ${shipping}
          </div>
          <p className="flex justify-end text-base gap-1">
            Delivery: <span className="font-semibold">Aug 20</span>
          </p>
        </div>
        <div className="group flex flex-col">
          <div className="flex flex-row justify-end items-center gap-2">
            <Icon
              name="BiMinus"
              className="text-gray-500"
              onClick={handleDecrement}
            />
            <p className="flex_justify_center text-sm text-onNeutralBg w-5 h-5 bg-primary-opacity rounded-sm cursor-default">
              {quantities[id] || 1}
            </p>
            <Icon
              name="BiPlus"
              className="text-gray-500"
              onClick={handleIncrement}
            />
            {!isEditing && (
              <div
                className="w-5 h-5 flex_justify_center bg-red-500 rounded hover:opacity-80"
                onClick={handleRemoveFromCart}
              >
                <Icon name="AiOutlineDelete" size={14} className="text-white" />
              </div>
            )}
            {isEditing && (
              <button
                className="w-5 h-5 flex_justify_center bg-none border border-primary rounded hover:opacity-80"
                onClick={oneSelectGame}
              >
                {hasOneSelect && (
                  <Icon name="HiCheck" size={16} className="text-primary" />
                )}
              </button>
            )}
          </div>
          <p className="flex justify-end text-sm">145 available</p>
        </div>
      </div>
    </div>
  );
};
