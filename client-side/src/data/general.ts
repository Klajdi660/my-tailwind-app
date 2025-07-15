import {
  GridList,
  NavLinkList,
  PageLinkItem,
  LangMapParams,
  PathProperties,
  DownloadBtnList,
  SettingsLinksParams,
  FontSizesProperties,
  NotificationItemList,
} from "../types";

export const dateFormat: string = "DD-MM-YYYY HH:mm:ss";

export const paths: PathProperties = {
  HOME: "/",
  LOGIN: "/login",
  BROWSE: "/browse",
  PROFILE: "/profile",
  REGISTER: "/register",
  DISCOVER: "/discover",
  SOCIAL_AUTH: "/social-auth",
  GAME_DETAILS: "/game-detail",
  VERIFY_CODE: "/verify-code",
  PASSWORD_CODE: "/password-code",
  FORGOT_PASSWORD: "/forgot-password",
  // RESET_PASSWORD: "/reset-password",
  RESET_PASSWORD: "/reset-password/:email/:hash",
  // CHANGE_PASSWORD: "update-password/:email/:username/:h/:exp",
  SAVE_AUTH_DATA: "/save-auth",
  ACCOUNT_SAVED: "/account-saved",
  LOGIN_HELP: "/login-help",
  MY_GAMES: "/my-games",
};

export const fontSizes: FontSizesProperties = {
  large: "text-2xl",
  medium: "text-xl",
  small: "text-lg",
  "extra-small": "text-sm",
  "extra-large": "text-3xl",
};

export const navlinks: NavLinkList[] = [
  {
    name: "Home",
    subLinks: [
      {
        tooltip: "hover",
        id: "discover",
        to: "/discover",
        name: "Discover",
        icon: "FaWpexplorer",
      },
      {
        id: "browse",
        to: "/browse",
        name: "Browse",
        tooltip: "hover",
        icon: "MdOutlineExplore",
      },
    ],
  },
  {
    name: "You",
    subLinks: [
      {
        id: "my_games",
        to: "/my-games",
        name: "My Games",
        tooltip: "hover",
        icon: "MdOutlineGames",
      },
      {
        id: "wishlist",
        to: "/wishlist",
        name: "Wishlist",
        tooltip: "hover",
        icon: "SlSocialDropbox",
      },
      {
        id: "store",
        to: "/store",
        name: "Store",
        tooltip: "hover",
        icon: "MdStorefront",
      },
    ],
  },
  {
    name: "Explore",
    subLinks: [
      {
        id: "collection",
        tooltip: "hover",
        to: "/collection",
        name: "Collections",
        icon: "RiFirefoxLine",
      },
      {
        id: "platforms",
        icon: "CgGames",
        to: "/platforms",
        tooltip: "hover",
        name: "Platforms",
      },
      {
        id: "genres",
        to: "/genres",
        icon: "BiGame",
        name: "Genres",
        tooltip: "hover",
      },
    ],
  },
];

export const settingsLinks: SettingsLinksParams[] = [
  {
    id: "general",
    name: "General Settings",
    icon: "AiOutlineSetting",
  },
  {
    id: "account",
    name: "Account Settings",
    icon: "MdOutlineSwitchAccount",
  },
  {
    id: "shipping",
    name: "Shipping Address",
    icon: "LuShip",
  },
  {
    id: "payments",
    name: "Payment Methods",
    icon: "MdOutlinePayment",
  },
];

// Component
export const notificationList: NotificationItemList[] = [
  {
    id: 1,
    time: "1 minute ago",
    content:
      "Mark Smith reacted to your recent added playlist - My first playlist",
  },
  {
    id: 2,
    time: "1 day ago",
    content: "Sarah Johnson created a new playlist - Downtown Music",
  },
  {
    id: 3,
    time: "1 week ago",
    content: "Bob Manuel sent you a private message",
  },
];

export const pageLink: PageLinkItem[] = [
  { name: "About", link: "/" },
  { name: "Legal", link: "/" },
  { name: "Policy", link: "/" },
  { name: "Contact", link: "/" },
];

export const downloadBtnList: DownloadBtnList[] = [
  { id: 1, name: "tiktok", icon: "FaTiktok" },
  { id: 2, name: "youtube", icon: "FaYoutube" },
  { id: 3, name: "facebook", icon: "FaFacebook" },
  { id: 4, name: "instagram", icon: "RiInstagramFill" },
];

export const grid: GridList = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};

export const languageMaps: LangMapParams = {
  FR: { label: "French", value: "FR" },
  DE: { label: "German", value: "DE" },
  ES: { label: "Spanish", value: "ES" },
  US: { label: "English", value: "US" },
  GB: { label: "British English", value: "GB" },
  IT: { label: "Italian", value: "IT" },
  AL: { label: "Albanian", value: "AL" },
};
