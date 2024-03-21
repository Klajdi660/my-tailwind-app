import { FunctionComponent, useState } from "react";
import { classNames } from "../utils";
import { Icon } from "./UI";

interface SearchbarProps {
  isMobile: boolean;
  toggleSearch: boolean;
  setToggleSearch: (value: boolean) => void;
}

export const Searchbar: FunctionComponent<SearchbarProps> = (props) => {
  const { isMobile, toggleSearch, setToggleSearch } = props;

  const [input, setInput] = useState("");

  return (
    <>
      <div
        className={classNames(
          "w-full h-full",
          isMobile
            ? classNames(
                "absolute p-3 duration-300 transition-all left-0",
                toggleSearch ? "top-0 bg-card" : "-top-navbar"
              )
            : "flex items-center"
        )}
      >
        <div
          className={classNames(
            "flex_justify_between h-full w-full",
            isMobile
              ? "border border-divider hover:border-primary rounded bg-main px-3 duration-500"
              : "rounded border border-divider focus-within:border-primary"
          )}
        >
          <Icon name="BiSearch" className={classNames(!isMobile && "ml-3")} />
          <input
            placeholder="Search for games..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent outline-0 text-onNeutralBg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* {isMobile && (
            <button
              className="w-8 h-8 transition-colors duration-500 rounded flex_justify_center bg-sidebar hover:bg-red-500"
              onClick={() => setToggleSearch(false)}
            >
              <Icon name="MdCancel" />
            </button>
          )} */}
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
          onClick={() => setToggleSearch(true)}
        >
          <Icon name="BiSearch" className="group-hover:!text-white" />
        </button>
      </div>
    </>
  );
};
