import { gameEndpoints } from "./Api";
import { HttpClient } from "../client";
import { ServerResponse } from "../types";
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

interface GameGenreListResponse {
  id: number;
  name: string;
  slug: string;
  image_bacground: string;
  games: { id: number; name: string; slug: string; added: number }[];
  games_count: number;
}

interface GamePlatformListResponse {
  id: number;
  name: string;
  slug: string;
  platforms: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image: string;
    image_background: string;
    year_start: number;
    year_end: number;
  }[];
}

interface GameReviewsResponse {
  can_delete: boolean;
  comments: Record<string, any>;
  comments_count: number;
  comments_parent_count: number;
  created: string;
  edited: string;
  external_author: string;
  external_avatar: string;
  external_lang: string;
  external_source: string;
  external_store: Record<string, any>;
  game: number;
  id: number;
  is_external: boolean;
  is_text: boolean;
  likes_count: number;
  likes_positive: number;
  likes_rating: number;
  posts_count: number;
  rating: number;
  reactions: any[];
  share_image: string;
  text: string;
  text_attachments: string;
  text_preview: string;
  text_previews: any[];
  user: any | null;
}

interface GameVideosResponse {
  id: number;
  name: string;
  preview: string;
  data: Record<string, any>;
}

interface GameDetailResponse {
  achievement_count: number;
  added: number;
  addedd_by_status: Record<string, any>;
  additions_count: number;
  alternative_names: string[];
  background_image: string;
  background_image_additional: string;
  clip: string;
  creators_count: number;
  description: string;
  description_raw: string;
  developers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  dominant_color: string;
  esrb_rating: { id: number; name: string; slug: string };
  game_series_count: number;
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  id: number;
  metacritic: number;
  metacritic_platforms: {
    metascore: number;
    platform: { platform: number; name: string; slug: string };
    url: string;
  }[];
  metacritic_url: string;
  movies_count: number;
  name: string;
  name_original: string;
  parent_achievements_count: number;
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  parents_count: number;
  platforms: {
    released_at: string;
    platform: { id: number; name: string; slug: string };
  }[];
  playtime: number;
  publishers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  rating: number;
  rating_top: number;
  ratings: { id: number; title: string; count: number; percent: number }[];
  ratings_count: number;
  reactions: Record<number, number>;
  reddit_count: number;
  reddit_description: string;
  reddit_logo: string;
  reddit_name: string;
  reddit_url: string;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  screenshots_count: number;
  slug: string;
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      game_count: number;
      image_background: string;
    };
  }[];
  suggestions_count: number;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  tba: boolean;
  twitch_count: number;
  updated: string;
  user_game: any;
  website: string;
  youtube_count: number;
}

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
