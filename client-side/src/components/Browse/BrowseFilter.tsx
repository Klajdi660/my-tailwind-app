import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Popover } from "antd";
import { Icon, Title } from "../UI";
import { classNames } from "../../utils";
import { useGameHook } from "../../hooks";
import { FilterBy } from "../../components";

export const BrowseFilter: FC = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { useGameFilterList } = useGameHook();

  const gameFilterList = useGameFilterList();

  const [openFilter, setOpenFilter] = useState<Record<string, boolean>>({});

  const handlePopoverChange = (key: string, newOpen: boolean) => {
    setOpenFilter((prevState) => ({
      ...prevState,
      [key]: newOpen,
    }));
  };

  const closePopover = (key: string) => {
    setOpenFilter((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  return (
    <div className="flex_justify_between">
      <Title name="Game Genres" type="large" divider={false} />
      <div className="flex gap-20">
        <div className="flex gap-6">
          {gameFilterList.map((gameFilter) => {
            const { id, name, value, filterList, width } = gameFilter;
            const filterName = searchParam.get(value) || "";

            return (
              <button
                type="button"
                key={id}
                className={classNames(
                  "flex_justify_center gap-2 group",
                  openFilter[value] ? "text-primary" : ""
                )}
              >
                <Popover
                  trigger="click"
                  arrow={false}
                  content={
                    <FilterBy
                      searchParam={searchParam}
                      setSearchParam={setSearchParam}
                      searchParamName={value}
                      filterName={filterName}
                      filterList={filterList}
                      width={width}
                      onClosePopover={() => closePopover(value)}
                    />
                  }
                  open={openFilter[value] || false}
                  onOpenChange={(newOpen) =>
                    handlePopoverChange(value, newOpen)
                  }
                  placement="bottomRight"
                  className="flex_justify_center gap-2"
                >
                  <span className="group-hover:text-primary">{name}</span>
                  {filterName && (
                    <span className="text-xs px-2 py-1 bg-primary-opacity rounded">
                      {filterName}
                    </span>
                  )}
                  <Icon
                    name="MdOutlineSort"
                    className="group-hover:text-primary"
                  />
                </Popover>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className={classNames(
            "flex_justify_center gap-2 group hover:text-primary",
            openFilter["new"] ? "text-primary" : ""
          )}
        >
          <Popover
            trigger="click"
            arrow={false}
            content={<p className="text-white">TEST</p>}
            open={openFilter["new"] || false}
            onOpenChange={(newOpen) => handlePopoverChange("new", newOpen)}
            placement="bottom"
            className="flex gap-2"
          >
            <span>New</span>
            <Icon name="LuArrowDownUp" className="group-hover:text-primary" />
          </Popover>
        </button>
      </div>
    </div>
  );
};
