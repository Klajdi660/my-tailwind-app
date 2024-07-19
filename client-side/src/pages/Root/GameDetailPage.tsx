import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { GameDetail } from "../../components";
import { GameDetailProps } from "../../types";
import { useFetchGame } from "../../lib";

export const GameDetailPage: FunctionComponent<GameDetailProps> = () => {
  const { gameId } = useParams<{ gameId: string | any }>();

  const { data: gameData } = useFetchGame(gameId);
  const { gameDetail, gameVideos } = gameData || {};

  return (
    <section className="game_detail_page">
      {(gameDetail || gameVideos) && (
        <GameDetail gameDetail={gameDetail} gameVideos={gameVideos} />
      )}
    </section>
  );
};

export default GameDetailPage;
