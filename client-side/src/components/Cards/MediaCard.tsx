import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlatformIconList } from "../Common";
import { Image, Icon } from "../UI";
import { paths } from "../../data";
import { useCart, useNotification } from "../../hooks";
import { MediaCardProps } from "../../types";
import { classNames, gameNameTruncate, getGamePrice } from "../../utils";

export const MediaCard: FunctionComponent<MediaCardProps> = (props) => {
  const { game, type } = props;

  const { gameDetail } = paths;

  const navigate = useNavigate();
  const [notify] = useNotification();
  const { addGameToCart } = useCart();

  const cart = useSelector((state: any) => state.cart.items);

  const gamePrice = getGamePrice(game);

  const gameInCart = cart.find((item: any) => item.id === game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addGameToCart(game);
    notify({ variant: "success", description: "Game was added to the cart" });
  };

  return (
    <div
      className={classNames(
        "shadow-sm p-3 rounded bg-card duration-300 case-in cursor-pointer group"
      )}
      onClick={() => navigate(`${gameDetail}/${game.id}`)}
    >
      <div className="relative flex justify-center">
        <div
          className={classNames(
            "relative h-full w-full overflow-hidden shadow_card",
            type === "artist" ? "rounded-full" : "rounded"
          )}
        >
          {game.background_image ? (
            <Image
              styles={classNames(
                "object-cover aspect-square w-full",
                type === "artist" ? "rounded-full" : "rounded"
              )}
              imgUrl={game.background_image}
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
        <h6 className="text-base font-semibold text-onNeutralBg">
          {gameNameTruncate(game?.name, 18)}
        </h6>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <PlatformIconList
              platforms={game.parent_platforms.map((p: any) => p.platform)}
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
          {gameInCart ? (
            <button className="p-2 bg-primary rounded text-sm">
              <Icon name="FaOpencart" size={20} className="text-white" />
            </button>
          ) : (
            <button
              className="p-2 bg-primary-opacity rounded text-sm hover:bg-primary"
              onClick={handleAddToCart}
            >
              <Icon name="FaOpencart" size={20} className="hover:text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
