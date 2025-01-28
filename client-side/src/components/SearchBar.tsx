import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../data";
import { classNames } from "../utils";
import { Icon, Image } from "../components";
import { useGames, useMediaResponsive, useStore } from "../hooks";

export const Searchbar: FC = () => {
  const { gameDetail, browse } = paths;

  const { useGameList } = useGames();
  const { isMobile } = useMediaResponsive();
  const { toggleSearch, setToggleSearch } = useStore();

  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  const searchbarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const params = {
    search: debouncedInput,
    page_size: 5,
  };

  useEffect(() => {
    setDebouncedInput(input);
  }, [input]);

  const { gameList } = useGameList(params) as any;

  const shouldShowDropdown = input.length >= 3 && gameList?.pages?.length > 0;

  const handleSearchSeleted = (id: string, type: string) => {
    const nav = type === "search" ? `${gameDetail}/${id}` : browse;
    setInput("");
    navigate(nav);
  };

  return (
    <>
      <div
        ref={searchbarRef}
        className={classNames(
          "w-[500px] h-full",
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
          {input.length > 0 && (
            <button
              className="w-8 h-8 mr-3 transition-colors duration-500 rounded-full flex_justify_center hover:bg-primary-opacity group"
              onClick={() => setInput("")}
            >
              <Icon name="MdClear" className="group-hover:text-primary" />
            </button>
          )}
          {isMobile && (
            <button
              className="w-8 h-8 transition-colors duration-500 rounded flex_justify_center hover:bg-red-500"
              onClick={() => setToggleSearch(false)}
            >
              <Icon name="MdCancel" />
            </button>
          )}
        </div>

        {shouldShowDropdown && (
          <div className="w-[500px] absolute top-20 bg-sidebar rounded shadow-lg p-2">
            {gameList?.pages.map((page: any, index: string) => (
              <div key={index}>
                {page.results.map((game: any, index: string) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-4 px-4 py-2 hover:bg-primary-opacity cursor-pointer rounded"
                    onClick={() => handleSearchSeleted(game.id, "search")}
                  >
                    <Image
                      imgUrl={game.background_image}
                      styles="w-10 h-12 rounded object-cover"
                    />
                    <span>{game.name}</span>
                  </div>
                ))}
              </div>
            ))}
            <span
              className="px-4 py-2 cursor-pointer hover:underline underline-offset-2 hover:text-primary"
              onClick={() => handleSearchSeleted("", "viewMore")}
            >
              View more
            </span>
          </div>
        )}
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
