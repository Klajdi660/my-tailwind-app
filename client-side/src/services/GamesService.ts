import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useNotification, useStore } from "../hooks";
import { ServerResponse } from "../types";

const { GET_GAME_LIST_API, GET_GAME_DETAIL_API } = gameEndpoints;

export const useGamesService = () => {
  const { setLoading } = useStore();
  const [notify] = useNotification();

  const getGamesList = async (values: any): Promise<void> => {
    try {
      const params = new URLSearchParams(values).toString();
      const url = `${GET_GAME_LIST_API}?${params}`;

      setLoading(true);

      const getGameListResp = await HttpClient.get<ServerResponse>(url);

      setLoading(false);

      const { error, message, data } = getGameListResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      setLoading(false);
      console.error(`Get games list field: ${error}`);
      throw error;
    }
  };

  const getGameDetail = async (values: any): Promise<void> => {
    try {
      const params = new URLSearchParams(values).toString();
      const url = `${GET_GAME_DETAIL_API}?${params}`;

      setLoading(true);

      const getGameDetailResp = await HttpClient.get<ServerResponse>(url);

      setLoading(false);

      const { error, message, data } = getGameDetailResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      setLoading(false);
      console.error(`Get games list field: ${error}`);
      throw error;
    }
  };

  return { getGamesList, getGameDetail };
};
