import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BiGame, BiSearch, BiUser, BiWorld } from "react-icons/bi";
import { BsMoonStars, BsNintendoSwitch, BsGlobe } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import {
  FaFacebook,
  FaOpencart,
  FaRegUser,
  FaTiktok,
  FaUser,
  FaWpexplorer,
  FaYoutube,
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";
import {
  MdCancel,
  MdCurrencyBitcoin,
  MdHome,
  MdLogin,
  MdOutlineDeleteOutline,
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
  MdPhoneIphone,
} from "react-icons/md";
import { PiWarningCircle, PiWarningCircleBold } from "react-icons/pi";
import { RiFirefoxLine, RiInstagramFill } from "react-icons/ri";
import { SlGameController, SlSocialDropbox, SlArrowUp } from "react-icons/sl";
import { SiNintendo } from "react-icons/si";
import { TiTimes } from "react-icons/ti";
import { IconParams, IconsMap } from "../../types";
import { classNames } from "../../utils";

const icons: IconsMap = {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineYoutube,
  AiOutlineInstagram,
  BiGame,
  BiSearch,
  BiUser,
  BiWorld,
  BsMoonStars,
  BsNintendoSwitch,
  CgGames,
  FaFacebook,
  FaOpencart,
  FaRegUser,
  FaTiktok,
  FaUser,
  FaWpexplorer,
  FaYoutube,
  FcGoogle,
  FiAlertTriangle,
  FiUpload,
  HiMenuAlt2,
  IoMdNotificationsOutline,
  LiaSignOutAltSolid,
  MdCancel,
  MdCurrencyBitcoin,
  MdHome,
  MdLogin,
  MdOutlineDeleteOutline,
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
  PiWarningCircle,
  PiWarningCircleBold,
  RiFirefoxLine,
  RiInstagramFill,
  SlGameController,
  SlSocialDropbox,
  SlArrowUp,
  TiTimes,
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
  MdPhoneIphone,
  SiNintendo,
  BsGlobe,
};

export const Icon: FunctionComponent<IconParams> = ({
  name = "MdHome",
  size = 20,
  className = "",
  ...props
}) => {
  const Icons = icons?.[name] || icons?.["MdHome"];

  return (
    <IconContext.Provider
      value={{
        className: classNames("text-onNeutralBg", className),
        ...props,
      }}
    >
      <Icons size={size} />
    </IconContext.Provider>
  );
};
