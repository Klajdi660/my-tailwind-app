import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { Image } from "../UI";
import { paths } from "../../data";
import { MediaCardProps } from "../../types";
import { classNames, gameNameTruncate, getGamePrice } from "../../utils";
import { useAppSelector } from "../../store";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game, type } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { gameDetail } = paths;

  const navigate = useNavigate();

  const { currency } = useAppSelector((state) => state.user);

  const gamePrice = getGamePrice(game);

  return (
    <div
      className="shadow-sm p-3 rounded bg-card duration-300 ease-in cursor-pointer text-onNeutralBg hover:bg-card-hover"
      onClick={() => navigate(`${gameDetail}/${id}`)}
    >
      <div className="relative">
        <div
          className={classNames(
            "relative h-full w-full overflow-hidden",
            type === "artist" ? "rounded-full" : "rounded"
          )}
        >
          {background_image && (
            <Image
              styles={classNames(
                "object-cover aspect-square w-full h-full",
                type === "artist" ? "rounded-full" : "rounded"
              )}
              imgUrl={background_image}
              name="image"
              effect="blur"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 desc mt-4 text-left">
        <h6 className="text-sm font-semibold text-onNeutralBg">
          {gameNameTruncate(name, 18)}
        </h6>
        <p className="flex flex-col gap-2 text-xs font-normal text-secondary">
          <span className="flex gap-2">
            <PlatformIconList
              className="text-secondary"
              platforms={parent_platforms
                .slice(0, 3)
                .map((p: any) => p.platform)}
            />
          </span>
          <span>
            {currency}
            {gamePrice}
          </span>
        </p>
      </div>
    </div>
  );
};
