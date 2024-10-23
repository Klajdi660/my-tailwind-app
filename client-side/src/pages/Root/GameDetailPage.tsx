import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGameHook } from "../../hooks";
import { GameDetail } from "../../components";
import { GameDetailPageProps } from "../../types";

export const GameDetailPage: FC<GameDetailPageProps> = () => {
  const { useGameDetail } = useGameHook();

  const { gameId } = useParams<{ gameId: string | any }>();

  const { gameDetail } = useGameDetail(gameId) as any;

  return (
    <section className="game_detail_page">
      {gameDetail && <GameDetail gameDetail={gameDetail} />}
    </section>
  );
};
