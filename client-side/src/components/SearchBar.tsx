import { FunctionComponent, useState } from "react";
import { classNames } from "../utils";
import { Icon } from "./UI";

interface SearchbarProps {}

export const Searchbar: FunctionComponent<SearchbarProps> = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <div className={classNames("w-full h-full flex items-center")}>
        <div
          className={classNames(
            "flex_justify_between h-full w-full border rounded border-divider focus-within:border-primary"
          )}
        >
          <Icon name="BiSearch" className="ml-3" />
          <input
            placeholder="Search for games..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent outline-0 text-onNeutralBg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          <Icon name="BiSearch" className="group-hover:!text-white" />
        </button>
      </div>
    </>
  );
};
