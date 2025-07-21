import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import {
  GameDetailResponse,
  GameGenreListResponse,
  GamePlatformListResponse,
  GameReviewsResponse,
  GameVideosResponse,
  ServerResponse,
} from "../types";
import { useNotification, useStore } from "../hooks";

const {
  GET_GAME_LIST_API,
  GET_GAME_DETAIL_API,
  GET_GAME_VIDEOS_API,
  GET_GAME_SLIDER_API,
  GET_GAME_REVIEWS_API,
  GET_GAME_GENRE_LIST_API,
  GET_GAME_PLATFORM_LIST_API,
} = gameEndpoints;

export const useGamesService = () => {
  const { setLoading } = useStore();
  const [notify] = useNotification();

  const getGames = async (pageParam: number | any, params: object) => {
    const getGameListResp = await HttpClient.get<ServerResponse>(
      GET_GAME_LIST_API,
      {
        page: pageParam,
        ...params,
      }
    );

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
    const getGameSliderResp =
      await HttpClient.get<ServerResponse>(GET_GAME_SLIDER_API);

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

  const getGameDetail = async (
    gameId: string
  ): Promise<GameDetailResponse | any> => {
    try {
      setLoading(true);

      const getGameDetailResp = await HttpClient.get<ServerResponse>(
        GET_GAME_DETAIL_API,
        { gameId }
      );

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

  const getGameVideos = async (
    gameId: string
  ): Promise<GameVideosResponse[]> => {
    try {
      const getGameVideosResp = await HttpClient.get<ServerResponse>(
        GET_GAME_VIDEOS_API,
        { gameId }
      );

      const { error, message, data } = getGameVideosResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return [];
      }
      return data;
    } catch (error) {
      console.error(`Get game videos field: ${error}`);
      throw error;
    }
  };

  const getGameReviews = async (
    gameId: string
  ): Promise<GameReviewsResponse[]> => {
    try {
      const getGameReviewsResp = await HttpClient.get<ServerResponse>(
        GET_GAME_REVIEWS_API,
        { gameId }
      );

      const { error, message, data } = getGameReviewsResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return [];
      }

      return data;
    } catch (error) {
      console.error(`Get game revies field: ${error}`);
      throw error;
    }
  };

  const getGameGenreList = async (): Promise<GameGenreListResponse[]> => {
    try {
      const getGameGenreListResp = await HttpClient.get<ServerResponse>(
        GET_GAME_GENRE_LIST_API
      );

      const { error, message, data } = getGameGenreListResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return [];
      }

      return data;
    } catch (error) {
      console.error(`Get game genre list field: ${error}`);
      throw error;
    }
  };

  const getGamePlatformList = async (): Promise<GamePlatformListResponse[]> => {
    try {
      const getGamePlatformListResp = await HttpClient.get<ServerResponse>(
        GET_GAME_PLATFORM_LIST_API
      );

      const { error, message, data } = getGamePlatformListResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return [];
      }

      return data;
    } catch (error) {
      console.error(`Get game platform list field: ${error}`);
      throw error;
    }
  };

  return {
    getGames,
    getGameDetail,
    getGameVideos,
    getGameReviews,
    getGamesSlider,
    getGameGenreList,
    getGamePlatformList,
  };
};
