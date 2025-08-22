import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { noImage } from "../../assets";
import { nameTruncate } from "../../utils";
import { MediaCardProps } from "../../types";
import { Image, PlatformIconList } from "../../components";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { GAME_DETAILS } = paths;

  const navigate = useNavigate();

  return (
    <div>
      <div
        className="relative cursor-pointer group"
        onClick={() => navigate(`${GAME_DETAILS}/${id}`)}
      >
        <Image
          styles="w-full h-36 object-cover shadow-md rounded"
          imgUrl={background_image || noImage}
          width="100%"
          name="image"
          effect="blur"
        />
        <div className=" h-36 absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
      </div>
      <div className="flex flex-col gap-2">
        <h6
          className="text-sm font-semibold text-onNeutralBg cursor-pointer hover:text-primary"
          onClick={() => navigate(`${GAME_DETAILS}/${id}`)}
        >
          {nameTruncate(name, 20)}
        </h6>
        <div className="flex gap-2">
          <PlatformIconList
            className="text-secondary"
            platforms={parent_platforms.slice(0, 3).map((p: any) => p.platform)}
          />
        </div>
      </div>
    </div>
  );
};
