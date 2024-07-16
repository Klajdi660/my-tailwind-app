import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useNotification } from "../hooks";
import { ServerResponse } from "../types";

const { GET_GAMES_LIST_API } = gameEndpoints;

export const useGamesService = () => {
  const [notify] = useNotification();

  const getGamesList = async (values: any): Promise<void> => {
    try {
      const params = new URLSearchParams(values).toString();
      const url = `${GET_GAMES_LIST_API}?${params}`;

      const getGamesListResp = await HttpClient.get<ServerResponse>(url);

      const { error, message, data } = getGamesListResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      console.error(`Get games list field: ${error}`);
      throw error;
    }
  };

  return { getGamesList };
};
