// AUTH ENDPOINTS
export const endpoints = {
  REGISTER_API: "/auth/register",
  VERIFY_EMAIL_API: "/auth/verify-email",
  LOGIN_API: "/auth/login",
  LOGOUT_API: "/auth/logout",
  FORGOTPASSWORD_API: "/auth/forgot-password",
  RESETPASSWORD_API: "/auth/reset-password",
  OAUTH_GOOGLE_API: "/auth/google",
};

// USER ENDPOINTS
export const userEndpoints = {
  GET_USER_DETAILS_API: "/user",
  GET_ALL_USER_API: "",
  DELETE_USER_API: "",
  UPDATE_USER_API: "",
  UPDATE_USER_PHOTO_API: "",
  CHANGEPASSWORD_API: "",
  CONTACT_API: "",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  CHANGE_USERNAME_API: "/profile/change-username",
  CHANGE_PASSWORD_API: "/profile/change-password",
  UPDATE_PROFILE_API: "/profile/update-profile",
  UPDATE_PROFILE_PICTURE_API: "/profile/update-display-picture",
  DELETE_PROFILE_PICTURE_API: "/profile/remove-display-picture",
  DELETE_PROFILE_API: "/profile/delete-account",
  CANCEL_DELETION_ACCOUNT_API: "/profile/cancel-deletion",
};

// GAMES ENDPOINTS
export const gameEndpoints = {
  GET_GAME_LIST_API: "/games",
  GET_GAME_DETAIL_API: "/games/game-detail",
  GET_GAME_VIDEOS_API: "/games/game-videos",
};
