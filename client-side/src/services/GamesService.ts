import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import {
  GameDetailResponse,
  GameGenreListResponse,
  GamePlatformListResponse,
  GameReviewsResponse,
  GameVideosResponse,
  ServerResponse,
  ServerResponseError,
} from "../types";
import { useNotification, useStore } from "../hooks";
import { notifyVariant } from "../data";

export const useGamesService = () => {
  const {
    GET_GAME_LIST_API,
    GET_GAME_DETAIL_API,
    GET_GAME_VIDEOS_API,
    GET_GAME_SLIDER_API,
    GET_GAME_REVIEWS_API,
    GET_GAME_GENRE_LIST_API,
    GET_GAME_PLATFORM_LIST_API,
  } = gameEndpoints;
  const { ERROR } = notifyVariant;

  const { setLoading } = useStore();
  const [notify] = useNotification();

  const getGames = async (pageParam: number | any, params: object) => {
    try {
      const response = await HttpClient.get<ServerResponse>(GET_GAME_LIST_API, {
        page: pageParam,
        ...params,
      });

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`get_games_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
    }
  };

  const getGamesSlider = async () => {
    try {
      const response =
        await HttpClient.get<ServerResponse>(GET_GAME_SLIDER_API);

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`get_games_slider_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
    }
  };

  const getGameDetail = async (
    gameId: string
  ): Promise<GameDetailResponse | any> => {
    try {
      setLoading(true);

      const response = await HttpClient.get<ServerResponse>(
        GET_GAME_DETAIL_API,
        { gameId }
      );

      setLoading(false);

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`get_game_detail_error: ${JSON.stringify(error)}`);
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });
      throw error;
    }
  };

  const getGameVideos = async (
    gameId: string
  ): Promise<GameVideosResponse[]> => {
    try {
      const response = await HttpClient.get<ServerResponse>(
        GET_GAME_VIDEOS_API,
        { gameId }
      );

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`get_game_videos_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
      return [];
    }
  };

  const getGameReviews = async (
    gameId: string
  ): Promise<GameReviewsResponse[]> => {
    try {
      const response = await HttpClient.get<ServerResponse>(
        GET_GAME_REVIEWS_API,
        { gameId }
      );

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponse;
      console.error(`get_game_reviews_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
      return [];
    }
  };

  const getGameGenreList = async (): Promise<GameGenreListResponse[]> => {
    try {
      const response = await HttpClient.get<ServerResponse>(
        GET_GAME_GENRE_LIST_API
      );

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponse;
      console.error(`get_game_genre_list_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
      return [];
    }
  };

  const getGamePlatformList = async (): Promise<GamePlatformListResponse[]> => {
    try {
      const response = await HttpClient.get<ServerResponse>(
        GET_GAME_PLATFORM_LIST_API
      );

      const { error, data } = response;

      if (error) throw response;

      return data;
    } catch (err) {
      const error = err as ServerResponse;
      console.error(`get_game_platform_list_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
      return [];
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
