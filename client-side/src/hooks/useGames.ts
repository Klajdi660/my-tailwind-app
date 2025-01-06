import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useGamesService } from "../services";
import { GameParams } from "../types";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export const useGameHook = () => {
  const { getGames, getGameDetail, getGamesSlider, getGameGenreList } =
    useGamesService();

  const useGameList = () => {
    const {
      data: gameList,
      isLoading,
      fetchNextPage,
      hasNextPage,
    } = useInfiniteQuery<FetchResponse<GameParams>, Error>({
      queryKey: ["games"],
      queryFn: async ({ pageParam = 1 }) => await getGames(pageParam),
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

  return { useGameGenreList, useGameSlider, useGameDetail, useGameList };
};
