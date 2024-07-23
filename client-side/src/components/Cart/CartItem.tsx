import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../data";
import { classNames, gameNameTruncate, getGamePrice } from "../../utils";
import { useCart, useNotification } from "../../hooks";
import { Button } from "../UI";

interface CartItemProps {
  key: number;
  item: any;
  imageDims: string;
  listDivider: boolean;
}

export const CartItem: FunctionComponent<CartItemProps> = (props) => {
  const { item, listDivider } = props;
  const { gameDetail } = paths;

  const { removeGameFromCart } = useCart();
  const [notify] = useNotification();

  const gamePrice = getGamePrice(item);

  const handleRemoveFromCart = () => {
    removeGameFromCart(item.id);
    notify({
      variant: "success",
      description: "Game was delete from the cart",
    });
  };

  return (
    <li
      key={item.id}
      className={classNames(
        "relative p-3 flex items-center text-base !text-onNeutralBg hover:bg-card-hover hover:rounded cursor-pointer group border-divider focus-within:bg-primary-opacity focus-within:rounded",
        listDivider ? "py-3" : "py-2"
      )}
    >
      <Link
        to={`${gameDetail}/${item.id}`}
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
              src={item.background_image}
              alt={item.slug}
              className={classNames("h-full w-full rounded aspect-square")}
            />
          </div>
          <div className="flex flex-col flex-1 w-full gap-1 text-onNeutralBg group-hover:text-primary">
            <span className="text-base">{gameNameTruncate(item.name, 25)}</span>
            <p className="text-sm text-secondary">${gamePrice}</p>
          </div>
        </div>
      </Link>
      <Button
        onClick={handleRemoveFromCart}
        variant="none"
        className="w-8 h-8 flex_justify_center"
        iconClassName="hover:text-primary"
        labelIcon="AiOutlineDelete"
        tooltipTitle="Delete"
      />
    </li>
  );
};
