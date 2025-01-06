import { FC, useState } from "react";
import { Popover } from "antd";
import { Icon } from "../UI";
import { gameFilterList } from "../../data";
import { classNames } from "../../utils";

export const GameFilter: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const popoverChangeHandler = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <div className="flex_justify_between">
      {/* <Title name="Game Genres" type="large" divider={false} /> */}
      <div></div>
      <div className="flex gap-20">
        <div className="flex gap-6">
          {gameFilterList.map((gameFilter) => (
            <button
              type="button"
              className={classNames(
                "flex_justify_center gap-2 group hover:text-primary",
                activeFilter === gameFilter.name ? "text-primary" : ""
              )}
              key={gameFilter.id}
              onClick={() => setActiveFilter(gameFilter.name)}
            >
              <span>{gameFilter.name}</span>
              <Icon name="MdOutlineSort" className="group-hover:text-primary" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className={classNames(
            "flex_justify_center gap-2 group hover:text-primary",
            activeFilter === "new" ? "text-primary" : ""
          )}
          onClick={() => setActiveFilter("new")}
        >
          {/* <span>New</span>
          <Icon
            name="LuArrowDownUp"
            className={classNames(
              "group-hover:text-primary",
              activeFilter === "New" ? "text-primary" : ""
            )}
          /> */}
          <Popover
            trigger="click"
            arrow={false}
            content={<p className="text-white">TEST</p>}
            open={openPopover}
            onOpenChange={popoverChangeHandler}
            placement="bottom"
            className="flex gap-2"
          >
            <span>New</span>
            <Icon
              name="LuArrowDownUp"
              className={classNames(
                "group-hover:text-primary"
                // activeFilter === "new" ? "text-primary" : ""
              )}
            />
          </Popover>
        </button>
      </div>
    </div>
  );
};
