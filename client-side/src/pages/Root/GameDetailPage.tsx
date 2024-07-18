import { FunctionComponent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GameDetail } from "../../components";
import { useGamesService } from "../../services";
import { GameDetailProps } from "../../types";

export const GameDetailPage: FunctionComponent<GameDetailProps> = () => {
  const { getGameDetail, getGameVideos } = useGamesService();
  const { gameId } = useParams();

  // const values = { gameId };

  // const queryOptions = {
  //   queryKey: ["gameDetail"],
  //   queryFn: () => getGameDetail(values),
  // };

  // const { data } = useQuery(queryOptions);

  const [gameDetail, setGameDetail] = useState<any>(null);
  const [gameVideos, setGameVideos] = useState<any>(null);

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

  useEffect(() => {
    const fetchGameVideos = async () => {
      try {
        const detail = await getGameVideos({ gameId });
        setGameVideos(detail);
      } catch (error) {
        console.error("Error fetching game detail:", error);
      }
    };

    fetchGameVideos();
  }, [gameId]);

  return (
    <section className="gaem_detail_page">
      {gameDetail && (
        <GameDetail gameDetail={gameDetail} gameVideos={gameVideos} />
      )}
    </section>
  );
};

export default GameDetailPage;
