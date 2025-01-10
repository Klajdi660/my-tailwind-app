import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useGamesService } from "../services";
import { GameParams } from "../types";
import { gameFilterList, gameRatingList } from "../data";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export const useGames = () => {
  const {
    getGames,
    getGameDetail,
    getGamesSlider,
    getGameGenreList,
    getGamePlatformList,
  } = useGamesService();

  const [searchParam] = useSearchParams();
  // const par = Object.fromEntries(
  //   Array.from(searchParam.entries()).filter(([_, value]) => value)
  // );

  const params = {
    genres: searchParam.get("genreId") || undefined,
    parent_platforms: searchParam.get("platformId") || undefined,
  };

  const useGameList = () => {
    const {
      data: gameList,
      isLoading,
      fetchNextPage,
      hasNextPage,
    } = useInfiniteQuery<FetchResponse<GameParams>, Error>({
      queryKey: ["games", params],
      queryFn: async ({ pageParam = 1 }) => await getGames(pageParam, params),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

    return { gameList, isLoading, fetchNextPage, hasNextPage };
  };

  const useGameDetail = (gameId: number | any) => {
    const { data: gameDetail } = useQuery({
      queryKey: ["games", gameId],
      queryFn: async () => await getGameDetail(gameId),
    });

    return { gameDetail };
  };

  const useGameSlider = () => {
    const { data: gamesSlider } = useQuery({
      queryKey: ["games-slider"],
      queryFn: async () => await getGamesSlider(),
    });

    return { gamesSlider };
  };

  const useGameGenreList = () => {
    const { data: gameGenreList, isLoading } = useQuery({
      queryKey: ["genres"],
      queryFn: async () => await getGameGenreList(),
    });

    return { gameGenreList, isLoading };
  };

  const useGamePlatformList = () => {
    const {
      data: gamePlatformList,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["platform"],
      queryFn: async () => await getGamePlatformList(),
    });

    return { gamePlatformList, isLoading, isError };
  };

  const useGameFilterList = () => {
    const { useGameGenreList, useGamePlatformList } = useGames();

    const { gameGenreList } = useGameGenreList() as any;
    const { gamePlatformList } = useGamePlatformList() as any;

    // Create a mapping of value to the corresponding list
    const filterListMapping: any = {
      platform: gamePlatformList,
      genre: gameGenreList,
      rating: gameRatingList,
    };

    // Update the filter list dynamically based on the value
    const updatedGameFilterList = gameFilterList.map((filter) => {
      const filterList = filterListMapping[filter.value];
      if (filterList) {
        return { ...filter, filterList };
      }
      return filter;
    });

    return updatedGameFilterList;
  };

  return {
    useGameGenreList,
    useGameSlider,
    useGameDetail,
    useGameList,
    useGamePlatformList,
    useGameFilterList,
  };
};
