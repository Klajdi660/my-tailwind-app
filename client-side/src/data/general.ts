import {
  GridList,
  NavLinkList,
  PageLinkItem,
  LangMenuItem,
  LangMapParams,
  CurrListParams,
  PathProperties,
  LogoProperties,
  AccountTypeList,
  DownloadBtnList,
  FontSizesProperties,
  NotificationItemList,
} from "../types";
import { alFlag, shFlag } from "../assets";

export const paths: PathProperties = {
  home: "/",
  login: "/login",
  browse: "/browse",
  profile: "/profile",
  register: "register",
  discover: "/discover",
  socialAuth: "social-auth",
  gameDetail: "/game-detail",
  verifyEmail: "verify-email",
  editProfile: "/edit-profile",
  passwordCode: "password-code",
  forgotPassword: "forgot-password",
  // resetPassword: "/reset-password",
  resetPassword: "reset-password/:email/:hash",
  // changePassword: "update-password/:email/:username/:h/:exp",
};

export const logo: LogoProperties = {
  name: "GrooveIT",
  icon: "SlGameController",
};

export const fontSizes: FontSizesProperties = {
  large: "text-2xl",
  medium: "text-xl",
  small: "text-lg",
  "extra-small": "text-sm",
  "extra-large": "text-3xl",
};

export const accountTypes: AccountTypeList[] = [
  { id: 1, tabName: "User", type: "User" },
  { id: 2, tabName: "Admin", type: "Admin" },
];

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

export const langMenuItem = ({ onSelectLanguage }: LangMenuItem) => [
  {
    id: "al",
    icon: alFlag,
    name: "Albanian",
    onClick: () => {
      onSelectLanguage("al");
    },
  },
  {
    id: "en",
    icon: shFlag,
    name: "English",
    onClick: () => {
      onSelectLanguage("en");
    },
  },
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

export const recommendedCountries = [
  "Albania",
  "Spain",
  "Italy",
  "Chile",
  "Korea",
  "Brazil",
  "France",
  "Israel",
  "Canada",
  "Poland",
  "Ukraine",
  "Australia",
  "Netherlands",
  "Switzerland",
  "Saudi Arabia",
  "United States",
  "United Kingdom",
];

export const currencyList: CurrListParams = {
  EUR: { label: "EUR (Euro)", value: "EUR" },
  GBP: { label: "GBP (Pound)", value: "GBP" },
  USD: { label: "USD (US Dollar)", value: "USD" },
  CHF: { label: "CHF (Swiss Franc)", value: "CHF" },
  ALL: { label: "ALL (Albanian Lek)", value: "ALL" },
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
