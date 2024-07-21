import { useQuery } from "@tanstack/react-query";
import { useGamesService } from "../../services";

interface GameData {
  gameDetail: any;
  gameVideos: any;
  gameReviews: any;
}

export const useFetchGame = (gameId: string) => {
  const { getGameDetail, getGameVideos, getGameReviews } = useGamesService();

  const { data } = useQuery<GameData | any>({
    queryKey: [`game_${gameId}`, { gameId }],
    queryFn: async () => {
      try {
        if (gameId) {
          const [gameDetail, gameVideos, gameReviews] = await Promise.all([
            getGameDetail({ gameId }),
            getGameVideos({ gameId }),
            getGameReviews({ gameId }),
          ]);
          return { gameDetail, gameVideos, gameReviews };
        }
        return null;
      } catch (error) {
        console.error(`Failed to fetch game. ${error}`);
      }
    },
  });

  return { data };
};
