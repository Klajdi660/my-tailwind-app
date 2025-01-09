import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../../hooks";
import { GameDetail } from "../../components";

export const GameDetailPage: FC = () => {
  const { useGameDetail } = useGames();

  const { gameId } = useParams<{ gameId: string | any }>();

  const { gameDetail } = useGameDetail(gameId) as any;

  return (
    <section className="game_detail_page">
      {gameDetail && <GameDetail gameDetail={gameDetail} />}
    </section>
  );
};
