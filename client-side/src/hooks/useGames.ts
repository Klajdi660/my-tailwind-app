import { useInfiniteQuery } from "@tanstack/react-query";
import { useGamesService } from "../services";
import { GameParams } from "../types";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export const useGames = () => {
  const { getGames } = useGamesService();
  return useInfiniteQuery<FetchResponse<GameParams>, Error>({
    queryKey: ["games"],
    queryFn: async ({ pageParam = 1 }) => await getGames(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
