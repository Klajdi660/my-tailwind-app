// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: "/auth/login",
  LOGIN_SAVED_USER_API: "/auth/login-saved-user",
  LOGOUT_API: "/auth/logout",
  REGISTER_API: "/auth/register",
  OAUTH_GOOGLE_API: "/auth/google",
  VERIFY_EMAIL_API: "/auth/verify-email",
  RESET_PASSWORD_API: "/auth/reset-password",
  FORGOT_PASSWORD_API: "/auth/forgot-password",
};

// USER ENDPOINTS
export const userEndpoints = {
  GET_ALL_USER_API: "",
  DELETE_USER_API: "",
  UPDATE_USER_API: "",
  UPDATE_USER_PHOTO_API: "",
  CHANGE_PASSWORD_API: "",
  CONTACT_API: "",
  GET_USER_DETAILS_API: "/user",
  SAVE_AUTH_USER_API: "/user/save-auth-user",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE_API: "/profile/update-profile",
  DELETE_PROFILE_API: "/profile/delete-account",
  CHANGE_USERNAME_API: "/profile/change-username",
  CHANGE_PASSWORD_API: "/profile/change-password",
  CANCEL_DELETION_ACCOUNT_API: "/profile/cancel-deletion",
  UPDATE_PROFILE_PICTURE_API: "/profile/update-display-picture",
  DELETE_PROFILE_PICTURE_API: "/profile/remove-display-picture",
};

// GAMES ENDPOINTS
export const gameEndpoints = {
  GET_GAME_LIST_API: "/games",
  GET_GAME_DETAIL_API: "/games/game-detail",
  GET_GAME_VIDEOS_API: "/games/game-videos",
  GET_GAME_REVIEWS_API: "/games/game-reviews",
  GET_GAME_SLIDER_API: "/games/game-slider",
  GET_GAME_GENRE_LIST_API: "/games/game-genre-list",
};
