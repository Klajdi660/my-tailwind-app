import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { GameDetail } from "../../components";
import { GameDetailPageProps } from "../../types";
import { useFetchGame } from "../../lib";

export const GameDetailPage: FunctionComponent<GameDetailPageProps> = () => {
  const { gameId } = useParams<{ gameId: string | any }>();

  const { data: gameData } = useFetchGame(gameId);
  const { gameDetail, gameVideos, gameReviews } = gameData || {};

  return (
    <section className="game_detail_page">
      {(gameDetail || gameVideos || gameReviews) && (
        <GameDetail
          gameDetail={gameDetail}
          gameVideos={gameVideos}
          gameReviews={gameReviews}
        />
      )}
    </section>
  );
};

export default GameDetailPage;
