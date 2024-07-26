import {
  GameParams,
  GameVideosParams,
  GameReviewsParams,
} from "./general.type";

export interface GameData {
  gameDetail: GameParams;
  gameVideos: GameVideosParams;
  gameReviews: GameReviewsParams[];
}
