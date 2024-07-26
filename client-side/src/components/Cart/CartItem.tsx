import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../UI";
import { paths } from "../../data";
import { useCart, useNotification } from "../../hooks";
import { CartItemProps } from "../../types";
import { classNames, gameNameTruncate } from "../../utils";

export const CartItem: FunctionComponent<CartItemProps> = (props) => {
  const {
    item,
    isEditing,
    selections,
    setSelections,
    quantities,
    setQuantities,
  } = props;
  const { id, name, slug, background_image, price } = item;
  const { gameDetail } = paths;

  const { removeGameFromCart } = useCart();
  const [notify] = useNotification();

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
  };

  return (
    <li
      key={id}
      className={classNames(
        "relative p-2 flex items-center text-base !text-onNeutralBg cursor-pointer"
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
              {gameNameTruncate(name, 20)}
            </span>
            <p className="flex text-sm text-secondary gap-1 group-hover:text-primary">
              <span className="text-red-600">$</span>
              {price}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex gap-2">
        <div className="group flex items-center gap-2">
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
        </div>
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
    </li>
  );
};
