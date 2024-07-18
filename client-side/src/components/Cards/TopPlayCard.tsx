import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { PlatformIconList } from "../Common";
import { paths } from "../../data";
import { classNames, gameNameTruncate } from "../../utils";
interface TopPlayCard {
  key: number;
  item: any;
  imageDims: string;
  listDivider: boolean;
}

export const TopPlayCard: FunctionComponent<TopPlayCard> = (props) => {
  const { item, listDivider } = props;
  const { gameDetail } = paths;

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
        className="relative flex justify-center w-full items-between group"
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
            <span className="text-sm">{gameNameTruncate(item.name, 25)}</span>
            <div className="flex flex-col gap-3 xs:flex-row">
              <PlatformIconList
                platforms={item.parent_platforms.map((p: any) => p.platform)}
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
