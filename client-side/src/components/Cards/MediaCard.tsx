import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { Image, Icon } from "../UI";
import { paths } from "../../data";
import { useCart } from "../../hooks";
import { MediaCardProps } from "../../types";
import { classNames, gameNameTruncate, getGamePrice } from "../../utils";
import { useAppSelector } from "../../store";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game, type } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { gameDetail } = paths;

  const navigate = useNavigate();
  const { addGameToCart } = useCart();

  const cart = useAppSelector((state) => state.cart.items);

  const gamePrice = getGamePrice(game);

  const gameInCart = cart.find((item: any) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addGameToCart(game);
  };

  return (
    <div
      className={classNames(
        "shadow-sm p-3 rounded bg-card duration-300 case-in cursor-pointer text-onNeutralBg transition duration-300 relative"
      )}
      onClick={() => navigate(`${gameDetail}/${id}`)}
    >
      <div className="relative flex justify-center">
        <div
          className={classNames(
            "relative h-full w-full overflow-hidden shadow_card",
            type === "artist" ? "rounded-full" : "rounded"
          )}
        >
          {background_image ? (
            <Image
              styles={classNames(
                "object-cover aspect-square w-full",
                type === "artist" ? "rounded-full" : "rounded"
              )}
              imgUrl={background_image}
              width={80}
              height={80}
              name="image"
            />
          ) : (
            <Icon
              name="BsMusicNoteBeamed"
              size={60}
              className="!text-secondary"
            />
          )}
        </div>
      </div>
      <div className={classNames("desc mt-4")}>
        <h6 className="text-base font-semibold">
          {gameNameTruncate(name, 18)}
        </h6>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <PlatformIconList
              platforms={parent_platforms.map((p: any) => p.platform)}
            />
          </div>
          {/* <div className="bg-primary-opacity px-2 py-1 rounded text-sm">
            {game.metacritic}
          </div> */}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="bg-primary-opacity p-2 rounded text-sm">
            ${gamePrice}
          </div>
          <div className="group">
            <button
              className={classNames(
                "p-2 rounded text-sm",
                gameInCart
                  ? "bg-primary hover:opacity-70"
                  : "bg-primary-opacity group-hover:bg-primary"
              )}
              onClick={handleAddToCart}
            >
              <Icon
                name="FaOpencart"
                size={20}
                className={classNames(
                  "group-hover:text-white",
                  gameInCart && "text-white"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
