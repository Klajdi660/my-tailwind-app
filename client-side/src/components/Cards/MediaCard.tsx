import { FunctionComponent } from "react";
import { MediaCardProps } from "../../types";
import { classNames, gameNameTruncate } from "../../utils";
import { Image, Icon } from "../UI";
import { PlatformIconList } from "../Common";

export const MediaCard: FunctionComponent<MediaCardProps> = (props) => {
  const { key, game, type } = props;

  return (
    <div
      className={classNames(
        "shadow-sm p-3 rounded bg-card hover:bg-card-hover duration-300 case-in cursor-pointer group"
      )}
    >
      <div className="relative">
        <div
          className={classNames(
            // "relative h-full w-full overflow-hidden shadow_card",
            // "relative overflow-hidden",
            type === "artist" ? "rounded-full" : "rounded"
          )}
        >
          {game.background_image ? (
            <Image
              styles={classNames(
                // "object-cover aspect-square w-full",
                type === "artist" ? "rounded-full" : "rounded"
              )}
              imgUrl={game.background_image}
              // width={80}
              // height={80}
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
        <h6 className="text-sm font-semibold text-onNeutralBg group-hover:text-primary">
          {gameNameTruncate(game?.name, 18)}
        </h6>
        <div className="flex flex-col mt-2 gap-2 xs:flex-row">
          <PlatformIconList
            platforms={game.parent_platforms.map((p: any) => p.platform)}
          />
        </div>
      </div>
    </div>
  );
};
