import {
  alFlag,
  shFlag,
  facebookIcon,
  instagramIcon,
  tiktokIcon,
  youtubeIcon,
} from "../assets";
import {
  PathProperties,
  LogoProperties,
  FontSizesProperties,
  AccountTypeList,
  NavLinkList,
  NotificationItemList,
  PageLinkItem,
  LangMenuItem,
  DownloadBtnList,
  GridList,
} from "../types";

export const paths: PathProperties = {
  home: "/",
  login: "/login",
  socialAuth: "social-auth",
  register: "register",
  verifyEmail: "verify-email",
  forgotPassword: "forgot-password",
  passwordCode: "password-code",
  // changePassword: "update-password/:email/:username/:h/:exp",
  resetPassword: "reset-password/:email/:hash",
  // resetPassword: "reset-password",
  profile: "/profile",
  editProfile: "/editProfile",
  discover: "/discover",
  browse: "browse",
};

export const logo: LogoProperties = {
  name: "GrooveIT",
  icon: "SlGameController",
};

export const fontSizes: FontSizesProperties = {
  "extra-large": "text-3xl",
  large: "text-2xl",
  medium: "text-xl",
  small: "text-lg",
  "extra-small": "text-sm",
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

// Component
export const notificationList: NotificationItemList[] = [
  {
    id: 1,
    content:
      "Mark Smith reacted to your recent added playlist - My first playlist",
    time: "1 minute ago",
  },
  {
    id: 2,
    content: "Sarah Johnson created a new playlist - Downtown Music",
    time: "1 day ago",
  },
  {
    id: 3,
    content: "Bob Manuel sent you a private message",
    time: "1 week ago",
  },
];

export const pageLink: PageLinkItem[] = [
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "Legal", link: "/" },
  { name: "Policy", link: "/" },
];

export const langMenuItem = ({ onSelectLanguage }: LangMenuItem) => [
  {
    id: "al",
    name: "Albanian",
    icon: alFlag,
    onClick: () => {
      onSelectLanguage("al");
    },
  },
  {
    id: "sh",
    name: "English",
    icon: shFlag,
    onClick: () => {
      onSelectLanguage("sh");
    },
  },
];

export const downloadBtnList: DownloadBtnList[] = [
  // { id: 1, name: "facebook", icon: facebookIcon },
  // { id: 2, name: "instagram", icon: instagramIcon },
  // { id: 3, name: "tiktok", icon: tiktokIcon },
  // { id: 4, name: "youtube", icon: youtubeIcon },
  { id: 1, name: "facebook", icon: "FaFacebook" },
  { id: 2, name: "instagram", icon: "RiInstagramFill" },
  { id: 3, name: "tiktok", icon: "FaTiktok" },
  { id: 4, name: "youtube", icon: "FaYoutube" },
];

export const grid: GridList = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};
