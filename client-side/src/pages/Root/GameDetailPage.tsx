import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../../hooks";
import { GameDetail } from "../../components";
import { GameDetailPageProps } from "../../types";

export const GameDetailPage: FC<GameDetailPageProps> = () => {
  const { gameId } = useParams<{ gameId: string | any }>();

  // const { data: gameData } = useFetchGame({ gameId });
  const { gameDetail } = useGame(gameId) as any;
  // const { gameDetail, gameVideos, gameReviews } = gameData || {};

  return (
    <section className="game_detail_page">
      {/* {(gameDetail || gameVideos || gameReviews) && (
        <GameDetail
          gameDetail={gameDetail}
          gameVideos={gameVideos}
          gameReviews={gameReviews}
        />
      )} */}
      {gameDetail && <GameDetail gameDetail={gameDetail} />}
    </section>
  );
};
