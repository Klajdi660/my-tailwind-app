import { useQuery } from "@tanstack/react-query";
import { useGamesService } from "../../services";
import { GameData, GameParams } from "../../types";
import { getGamePrice } from "../../utils";

interface GameFetchParams {
  gameId?: string;
  gameKey?: string;
  page?: number;
  pageSize?: number;
}

export const useFetchGame = ({
  gameId,
  gameKey,
  page,
  pageSize,
}: GameFetchParams) => {
  const { getGameDetail, getGameVideos, getGameReviews, getGameList } =
    useGamesService();

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

  const { data: gameList } = useQuery<GameParams | any>({
    queryKey: [`${gameKey}`],
    queryFn: async () => {
      try {
        let gameLists: any = await getGameList({ page, pageSize });

        gameLists?.forEach(
          (game: GameParams) => (game.price = getGamePrice(game))
        );
        return gameLists;
      } catch (error) {
        console.error(`Failed to fetch game. ${error}`);
      }
    },
  });

  return { data, gameList };
};
