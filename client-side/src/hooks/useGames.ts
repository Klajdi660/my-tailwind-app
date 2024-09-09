import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useGamesService } from "../services";
import { GameParams } from "../types";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

interface UseGamesParams {
  gameId?: string | any;
}

export const useGames = () => {
  const { getGames } = useGamesService();
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

export const useGame = (gameId: number | any) => {
  const { getGameDetail } = useGamesService();
  const { data: gameDetail } = useQuery({
    queryKey: ["games", gameId],
    queryFn: async () => await getGameDetail(gameId),
  });

  return { gameDetail };
};

export const useGameSlider = () => {
  const { getGamesSlider } = useGamesService();
  const { data: gamesSlider } = useQuery({
    queryKey: ["games-slider"],
    queryFn: async () => await getGamesSlider(),
  });

  return { gamesSlider };
};
