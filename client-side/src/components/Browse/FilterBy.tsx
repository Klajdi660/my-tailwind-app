import { FC } from "react";
import { classNames } from "../../utils";

interface FilterByProps {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  filterName: string;
  searchParamName: string;
  filterList: any;
  width: string;
  onClosePopover: () => void;
}

export const FilterBy: FC<FilterByProps> = (props) => {
  const {
    searchParams,
    setSearchParams,
    filterName,
    onClosePopover,
    searchParamName,
    filterList,
    width,
  } = props;

  const handleFilterList = (name: string, id: string) => {
    searchParams.delete(searchParamName);
    searchParams.delete(`${searchParamName}Id`);
    searchParams.append(`${searchParamName}Id`, id);
    searchParams.append(searchParamName, name);
    setSearchParams(searchParams);
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
