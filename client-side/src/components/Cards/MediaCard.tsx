import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { Image } from "../UI";
import { paths } from "../../data";
import { MediaCardProps } from "../../types";
import { classNames } from "../../utils";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { gameDetail } = paths;

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const gameId = searchParam.get("gameId");

  return (
    <div
      className={classNames(
        "shadow-sm rounded duration-300 ease-in cursor-pointer text-onNeutralBg group",
        gameId?.includes(id.toString())
          ? "bg-primary-opacity opacity-75"
          : "bg-card"
      )}
      onClick={() => navigate(`${gameDetail}/${id}`)}
    >
      {background_image && (
        <div className="transition-opacity duration-300 ease-in-out group-hover:opacity-75">
          <Image
            styles="h-40 object-cover aspect-square rounded-t"
            width="100%"
            imgUrl={background_image}
            name="image"
            effect="blur"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 desc text-left p-3">
        <h6 className="text-sm font-semibold text-onNeutralBg">{name}</h6>
        <p className="flex flex-col gap-2 text-xs font-normal text-secondary">
          <span className="flex gap-2">
            <PlatformIconList
              className="text-secondary"
              platforms={parent_platforms
                .slice(0, 3)
                .map((p: any) => p.platform)}
            />
          </span>
        </p>
      </div>
    </div>
  );
};
