import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineEdit,
  AiOutlineLock,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineCloudUpload,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  BiPlus,
  BiLock,
  BiGame,
  BiUser,
  BiMinus,
  BiWorld,
  BiSearch,
  BiChevronsRight,
  BiSelectMultiple,
} from "react-icons/bi";
import {
  BsGlobe,
  BsMoonStars,
  BsShieldLock,
  BsFillPlayFill,
  BsNintendoSwitch,
} from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { CgGames } from "react-icons/cg";
import {
  FaUser,
  FaXbox,
  FaApple,
  FaLinux,
  FaTiktok,
  FaYoutube,
  FaAndroid,
  FaWindows,
  FaRegUser,
  FaFacebook,
  FaOpencart,
  FaWpexplorer,
  FaPlaystation,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { HiMenuAlt2, HiCheck } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaSignOutAltSolid, LiaCarSideSolid } from "react-icons/lia";
import {
  MdHome,
  MdClear,
  MdLogin,
  MdCancel,
  MdStorefront,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlineWbSunny,
  MdOutlineExplore,
  MdCurrencyBitcoin,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { PiWarningCircle, PiWarningCircleBold } from "react-icons/pi";
import {
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
} from "react-icons/ri";
import {
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
} from "react-icons/sl";
import { SiNintendo } from "react-icons/si";
import { TiTimes } from "react-icons/ti";

import { IconParams, IconsMap } from "../../types";
import { classNames } from "../../utils";

const icons: IconsMap = {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineEdit,
  AiOutlineLock,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineCloudUpload,
  AiOutlineEyeInvisible,
  BiPlus,
  BiLock,
  BiGame,
  BiUser,
  BiMinus,
  BiWorld,
  BiSearch,
  BiChevronsRight,
  BiSelectMultiple,
  BsGlobe,
  BsMoonStars,
  BsShieldLock,
  BsFillPlayFill,
  BsNintendoSwitch,
  CiShoppingTag,
  CgGames,
  FaUser,
  FaXbox,
  FaApple,
  FaLinux,
  FaTiktok,
  FaYoutube,
  FaAndroid,
  FaWindows,
  FaRegUser,
  FaFacebook,
  FaOpencart,
  FaWpexplorer,
  FaPlaystation,
  FcGoogle,
  FiUpload,
  FiAlertTriangle,
  HiCheck,
  HiMenuAlt2,
  IoMdNotificationsOutline,
  LiaCarSideSolid,
  LiaSignOutAltSolid,
  MdHome,
  MdClear,
  MdLogin,
  MdCancel,
  MdStorefront,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlineWbSunny,
  MdOutlineExplore,
  MdCurrencyBitcoin,
  MdOutlineDeleteOutline,
  GoArrowLeft,
  PiWarningCircle,
  PiWarningCircleBold,
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
  SiNintendo,
  TiTimes,
};

export const Icon: FunctionComponent<IconParams> = ({
  name = "MdHome",
  size = 20,
  className = "",
  onClick,
  ...props
}) => {
  const Icons = icons?.[name] || icons?.["MdHome"];

  return (
    <IconContext.Provider
      value={{
        // className: classNames("text-onNeutralBg", className),
        className: classNames(className, "text-onNeutralBg"),
        ...props,
      }}
    >
      <Icons size={size} onClick={onClick} />
    </IconContext.Provider>
  );
};
