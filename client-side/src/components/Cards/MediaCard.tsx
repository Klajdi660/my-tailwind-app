import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { Image } from "../UI";
import { paths } from "../../data";
import { MediaCardProps } from "../../types";

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { game } = props;
  const { id, background_image, name, parent_platforms } = game;
  const { gameDetail } = paths;

  const navigate = useNavigate();

  console.log("game :>> ", game);

  return (
    <div
      className="shadow-sm p-3 rounded bg-card duration-300 ease-in cursor-pointer text-onNeutralBg hover:bg-card-hover"
      onClick={() => navigate(`${gameDetail}/${id}`)}
    >
      {background_image && (
        <Image
          styles={"h-32 object-cover aspect-square rounded"}
          width="100%"
          imgUrl={background_image}
          name="image"
          effect="blur"
        />
      )}
      <div className="flex flex-col gap-2 desc mt-4 text-left">
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
