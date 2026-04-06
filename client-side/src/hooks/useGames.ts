import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useGamesService } from "../services";
import { FetchResponse, GameParams } from "../types";
import { gameFilterList, gameRatingList } from "../data";

/** Slider API may return a bare array or a paginated `{ results }` payload. */
function normalizeGamesSliderData(data: unknown): GameParams[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as GameParams[];
  if (
    typeof data === "object" &&
    data !== null &&
    "results" in data &&
    Array.isArray((data as FetchResponse<GameParams>).results)
  ) {
    return (data as FetchResponse<GameParams>).results;
  }
  return [];
}

export const useGames = () => {
  const {
    getGames,
    getGameDetail,
    getGamesSlider,
    getGameGenreList,
    getGamePlatformList,
    getGameReviews,
    getGameVideos,
  } = useGamesService();

  const useGameList = (params: object) => {
    const {
      data: gameList,
      isLoading,
      fetchNextPage,
      hasNextPage,
    } = useInfiniteQuery<FetchResponse<GameParams>, Error>({
      queryKey: ["games", params],
      queryFn: async ({ pageParam = 1 }) => await getGames(pageParam, params),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.next ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

    return { gameList: gameList?.pages, isLoading, fetchNextPage, hasNextPage };
  };

  const useGameDetail = (gameId: number | any) => {
    const { data: gameDetail } = useQuery({
      queryKey: ["games", gameId],
      queryFn: async () => await getGameDetail(gameId),
    });

    const { data: gameReviews } = useQuery({
      queryKey: ["games-reviews", gameId],
      queryFn: async () => await getGameReviews(gameId),
    });

    const { data: gameVideos } = useQuery({
      queryKey: ["games-videos", gameId],
      queryFn: async () => await getGameVideos(gameId),
    });

    return { gameDetail, gameReviews, gameVideos };
  };

  const useGameSlider = () => {
    const { data, isPending: isSliderPending } = useQuery({
      queryKey: ["games-slider"],
      queryFn: async () => await getGamesSlider(),
    });

    const gamesSlider = useMemo(
      () => normalizeGamesSliderData(data),
      [data],
    );

    return { gamesSlider, isSliderPending };
  };

  const useGameGenreList = () => {
    const { data, isPending, isSuccess } = useQuery({
      queryKey: ["genres"],
      queryFn: async () => await getGameGenreList(),
    });

    return {
      gameGenreList: data,
      isGameGenreListLoading: isPending,
      isGameGenreListSuccess: isSuccess,
    };
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

    const { gameGenreList } = useGameGenreList();
    const { gamePlatformList } = useGamePlatformList();

    const filterListMapping: Record<string, any> = {
      platform: gamePlatformList,
      genre: gameGenreList,
      rating: gameRatingList,
    };

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
