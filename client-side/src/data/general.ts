import { FontSizesMap } from "../types/general.type";

export const paths = {
  home: "/",
  login: "/login",
  socialAuth: "social-auth",
  register: "register",
  verifyEmail: "verify-email",
  forgotPassword: "forgot-password",
  passwordCode: "password-code",
  // changePassword: "update-password/:email/:username/:h/:exp",
  // resetPassword: "reset-password/:token",
  resetPassword: "reset-password",
  profile: "profile",
  discover: "/discover",
  browse: "browse",
};

export const logo = {
  name: "GrooveIT",
  icon: "SlGameController",
};

export const fontSizes: FontSizesMap = {
  "extra-large": "text-3xl",
  large: "text-2xl",
  medium: "text-xl",
  small: "text-lg",
  "extra-small": "text-sm",
};

export const accountTypes = [
  {
    id: 1,
    tabName: "User",
    type: "User",
  },
  {
    id: 2,
    tabName: "Admin",
    type: "Admin",
  },
];

export const navlinks = [
  {
    name: "Home",
    subLinks: [
      {
        id: "discover",
        name: "Discover",
        to: "/discover",
        icon: "FaWpexplorer",
        tooltip: "hover",
      },
      {
        id: "browse",
        name: "Browse",
        to: "/browse",
        icon: "MdOutlineExplore",
        tooltip: "hover",
      },
    ],
  },
  {
    name: "You",
    subLinks: [
      {
        id: "my_games",
        name: "My Games",
        to: "/my-games",
        icon: "MdOutlineGames",
        tooltip: "hover",
      },
      {
        id: "wishlist",
        name: "Wishlist",
        to: "/wishlist",
        icon: "SlSocialDropbox",
        tooltip: "hover",
      },
      {
        id: "store",
        name: "Store",
        to: "/store",
        icon: "MdStorefront",
        tooltip: "hover",
      },
    ],
  },
  {
    name: "Explore",
    subLinks: [
      {
        id: "collection",
        name: "Collections",
        to: "/collection",
        icon: "RiFirefoxLine",
        tooltip: "hover",
      },
      {
        id: "platforms",
        name: "Platforms",
        to: "/platforms",
        icon: "CgGames",
        tooltip: "hover",
      },
      {
        id: "genres",
        name: "Genres",
        to: "/genres",
        icon: "BiGame",
        tooltip: "hover",
      },
    ],
  },
];
