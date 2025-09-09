import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { noImage } from "../../assets";
import { Image } from "../../components";
import { nameTruncate } from "../../utils";
import { MediaCardProps } from "../../types";

export const MediaCard: FC<MediaCardProps> = ({ game }) => {
  const { id, background_image, name, genres } = game;

  const { GAME_DETAILS } = paths;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <p className="text-xs text-secondary">{genres[0].name}</p>
          <h6
            className="text-sm font-semibold text-onNeutralBg cursor-pointer hover:text-primary"
            onClick={() => navigate(`${GAME_DETAILS}/${id}`)}
          >
            {nameTruncate(name, 20)}
          </h6>
        </div>
        <p className="text-onNeutralBg">$10</p>
      </div>
    </div>
  );
};
