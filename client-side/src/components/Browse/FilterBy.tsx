import { FC } from "react";
import { classNames } from "../../utils";

interface FilterByProps {
  searchParam: URLSearchParams;
  setSearchParam: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  filterName: string;
  searchParamName: string;
  filterList: any;
  width: string;
  onClosePopover: () => void;
}

export const FilterBy: FC<FilterByProps> = (props) => {
  const {
    searchParam,
    setSearchParam,
    filterName,
    onClosePopover,
    searchParamName,
    filterList,
    width,
  } = props;

  const handleFilterList = (name: string, id: string) => {
    searchParam.delete(searchParamName);
    searchParam.delete(`${searchParamName}Id`);
    searchParam.append(searchParamName, name);
    searchParam.append(`${searchParamName}Id`, id);
    setSearchParam(searchParam);
    onClosePopover();
  };

  return (
    <div className={classNames("flex flex-col", `w-[${width}]`)}>
      <div className="flex flex-wrap gap-2">
        {filterList?.map((filter: any) => {
          return (
            <button
              type="button"
              className={classNames(
                "px-4 py-2 rounded-full",
                filterName.includes(filter.name)
                  ? "bg-primary text-white"
                  : "bg-main hover:bg-primary-opacity hover:text-primary transition-all"
              )}
              key={filter.id}
              onClick={() => handleFilterList(filter.name, filter.id)}
            >
              {filter.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
