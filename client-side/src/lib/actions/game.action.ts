import { useQuery } from "@tanstack/react-query";
import { useGamesService } from "../../services";

interface GameData {
  gameDetail: any;
  gameVideos: any;
}

export const useFetchGame = (gameId: string) => {
  const { getGameDetail, getGameVideos } = useGamesService();

  const { data } = useQuery<GameData | any>({
    queryKey: [`game_${gameId}`, { gameId }],
    queryFn: async () => {
      try {
        if (gameId) {
          const [gameDetail, gameVideos] = await Promise.all([
            getGameDetail({ gameId }),
            getGameVideos({ gameId }),
          ]);
          return { gameDetail, gameVideos };
        }
        return null;
      } catch (error) {
        console.error(`Failed to fetch game. ${error}`);
      }
    },
  });

  return { data };
};
