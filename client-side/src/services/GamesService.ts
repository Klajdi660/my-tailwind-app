import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import { ServerResponse } from "../types";
import { useNotification, useStore } from "../hooks";
import axios, { AxiosRequestConfig } from "axios";

const {
  GET_GAME_LIST_API,
  GET_GAME_DETAIL_API,
  GET_GAME_VIDEOS_API,
  GET_GAME_REVIEWS_API,
  GET_GAME_SLIDER_API,
  GET_GAME_GENRE_LIST_API,
} = gameEndpoints;

export const useGamesService = () => {
  const { setLoading } = useStore();
  const [notify] = useNotification();

  const getGames = async (pageParam: number | any) => {
    const params = new URLSearchParams({
      page: pageParam.toString(),
    }).toString();
    const url = `${GET_GAME_LIST_API}?${params}`;

    const getGameListResp = await HttpClient.get<ServerResponse>(url);
    const { error, message, data } = getGameListResp;
    if (error) {
      notify({
        variant: "error",
        description: message,
      });
      return;
    }
    return data;
  };

  const getGamesSlider = async () => {
    const url = `${GET_GAME_SLIDER_API}`;

    const getGameSliderResp = await HttpClient.get<ServerResponse>(url);
    const { error, message, data } = getGameSliderResp;
    if (error) {
      notify({
        variant: "error",
        description: message,
      });
      return;
    }
    return data;
  };

  // const getGameList = async (values: any): Promise<void> => {
  //   try {
  //     const params = new URLSearchParams(values).toString();
  //     const url = `${GET_GAME_LIST_API}?${params}`;

  //     setLoading(true);

  //     const getGameListResp = await HttpClient.get<ServerResponse>(url);

  //     setLoading(false);

  //     const { error, message, data } = getGameListResp;
  //     if (error) {
  //       notify({
  //         variant: "error",
  //         description: message,
  //       });
  //       return;
  //     }

  //     return data.results;
  //   } catch (error) {
  //     setLoading(false);
  //     console.error(`Get games list field: ${error}`);
  //     throw error;
  //   }
  // };

  const getGameDetail = async (gameId: string): Promise<void> => {
    try {
      // const params = new URLSearchParams(values).toString();
      const params = new URLSearchParams({
        gameId: gameId,
      })?.toString();
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

  const getGameVideos = async (values: any): Promise<void> => {
    try {
      const params = new URLSearchParams(values).toString();
      const url = `${GET_GAME_VIDEOS_API}?${params}`;

      const getGameVideosResp = await HttpClient.get<ServerResponse>(url);

      const { error, message, data } = getGameVideosResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      console.error(`Get game videos field: ${error}`);
      throw error;
    }
  };

  const getGameReviews = async (values: any): Promise<void> => {
    try {
      const params = new URLSearchParams(values).toString();
      const url = `${GET_GAME_REVIEWS_API}?${params}`;

      const getGameReviewsResp = await HttpClient.get<ServerResponse>(url);

      const { error, message, data } = getGameReviewsResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      console.error(`Get game videos field: ${error}`);
      throw error;
    }
  };

  const getGameGenreList = async (): Promise<void> => {
    try {
      const url = `${GET_GAME_GENRE_LIST_API}`;

      const getGameGenreListResp = await HttpClient.get<ServerResponse>(url);

      const { error, message, data } = getGameGenreListResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      return data;
    } catch (error) {
      console.error(`Get game genre list field: ${error}`);
      throw error;
    }
  };

  return {
    // getGameList,
    getGameDetail,
    getGameVideos,
    getGameReviews,
    getGames,
    getGamesSlider,
    getGameGenreList,
  };
};
