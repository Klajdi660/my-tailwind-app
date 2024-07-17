import { FunctionComponent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GameDetail } from "../../components";
import { useGamesService } from "../../services";
import { GameDetailProps } from "../../types";

export const GameDetailPage: FunctionComponent<GameDetailProps> = () => {
  const { getGameDetail } = useGamesService();
  const { gameId } = useParams();

  // const values = { gameId };

  // const queryOptions = {
  //   queryKey: ["gameDetail"],
  //   queryFn: () => getGameDetail(values),
  // };

  // const { data } = useQuery(queryOptions);

  const [gameDetail, setGameDetail] = useState<any>(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const detail = await getGameDetail({ gameId });
        setGameDetail(detail);
      } catch (error) {
        console.error("Error fetching game detail:", error);
      }
    };

    fetchGameDetail();
  }, [gameId]);

  return (
    <section className="gaem_detail_page">
      {/* <div className="relative gap-6"> */}
      {gameDetail && <GameDetail gameDetail={gameDetail} />}
      {/* </div> */}
    </section>
  );
};

export default GameDetailPage;
