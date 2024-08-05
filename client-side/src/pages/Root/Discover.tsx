import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiscoverPageProps, GameParams } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useGamesService } from "../../services";
import { Image, PlatformIconList } from "../../components";
import { classNames, gameNameTruncate } from "../../utils";
import { paths } from "../../data";
import { getRandomDiscoverGames, cycleDiscoverGameArray } from "../../utils";
import { useScrollTo } from "framer-motion-scroll-to-hook";

const cardDuration = 10;

export const DiscoverPage: FunctionComponent<DiscoverPageProps> = () => {
  const { getGameList } = useGamesService();
  const scrollTo = useScrollTo();

  const { gameDetail } = paths;

  const [games, setGames] = useState<GameParams[]>();

  const queryOptions = {
    queryKey: ["topPlay"],
    queryFn: () => getGameList({ page: 1, pageSize: 5 }),
  };

  const { data: gameList } = useQuery(queryOptions) as any;

  // useEffect(() => {
  //   let interval: any;
  //   (async () => {
  //     const games = getRandomDiscoverGames(gameList, 4) as any;
  //     setGames(games);
  //     interval = setInterval(() => {
  //       setGames(
  //         (games) =>
  //           cycleDiscoverGameArray(games as GameParams[]) as GameParams[]
  //       );
  //     }, cardDuration * 1000);
  //   })();
  //   scrollTo();
  //   return () => clearInterval(interval);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        <section className="discover-content">
          <h1 className="text-onNeutralBg">Discover Page</h1>
          <div className="w-full flex_justify_between flex-row h-[250px]">
            <div className="flex_justify_between flex-row bg-switch w-[68%] h-full rounded-3xl p-4">
              <div>TEST</div>
              <Image
                imgUrl={gameList?.[0]?.background_image}
                styles="rounded-3xl w-[48%] h-full"
              />
            </div>
            <div className="flex_justify_center flex-col w-[30%] h-full">
              <ul className="flex flex-col w-full list-none gap-2 py-2">
                {gameList?.length &&
                  gameList?.slice(1, 4).map((item: any) => {
                    return (
                      <li
                        key={item.id}
                        className={classNames(
                          "relative p-3 flex items-center text-base !text-onNeutralBg hover:bg-card-hover cursor-pointer group border-divider focus-within:bg-primary-opacity bg-primary-opacity rounded"
                        )}
                      >
                        <Link
                          to={`${gameDetail}/${item.id}`}
                          className="relative flex justify-center w-full items-center group"
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
                                className={classNames(
                                  "h-full w-full rounded aspect-square"
                                )}
                              />
                            </div>
                            <div className="flex flex-col flex-1 w-full gap-1 text-onNeutralBg group-hover:text-primary">
                              <span className="text-sm">
                                {gameNameTruncate(item.name, 25)}
                              </span>
                              <div className="flex flex-col gap-3 xs:flex-row">
                                <PlatformIconList
                                  platforms={item.parent_platforms.map(
                                    (p: any) => p.platform
                                  )}
                                  className="group-hover:text-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DiscoverPage;
