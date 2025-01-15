import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { Image } from "../UI";
import { paths } from "../../data";
import { nameTruncate } from "../../utils";
import { MediaCardProps } from "../../types";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { gameDetail } = paths;

  const navigate = useNavigate();

  return (
    <div
      className="shadow-sm gb-card rounded duration-300 ease-in cursor-pointer text-onNeutralBg group"
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
        <h6 className="text-sm font-semibold text-onNeutralBg">
          {nameTruncate(name, 30)}
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
        </p>
      </div>
    </div>
  );
};
