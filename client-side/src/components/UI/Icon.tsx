import { FC } from "react";
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
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineCloudUpload,
  AiOutlineEyeInvisible,
  AiOutlineExclamationCircle,
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
  BiSend,
} from "react-icons/bi";
import {
  BsGlobe,
  BsThreeDots,
  BsMoonStars,
  BsShieldLock,
  BsFillPlayFill,
  BsNintendoSwitch,
  BsFillArrowUpCircleFill,
  BsSignpostSplit,
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
  FaClock,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiUpload, FiEdit } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import {
  HiMenuAlt2,
  HiCheck,
  HiOutlineUpload,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { HiChartBar } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaSignOutAltSolid, LiaCarSideSolid } from "react-icons/lia";
import { LuShip } from "react-icons/lu";
import {
  MdHome,
  MdClear,
  MdLogin,
  MdCancel,
  MdStorefront,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlineWbSunny,
  MdOutlineExplore,
  MdCurrencyBitcoin,
  MdOutlineDeleteOutline,
  MdOutlineAddCircleOutline,
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
  MdOutlineLocationSearching,
  MdOutlineSwitchAccount,
  MdOutlineCameraAlt,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import {
  PiWarningCircle,
  PiWarningCircleBold,
  PiArrowFatLinesUp,
} from "react-icons/pi";
import {
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiArrowUpLine,
} from "react-icons/ri";
import {
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
} from "react-icons/sl";
import { SiNintendo } from "react-icons/si";
import { TiTimes, TiLocationArrowOutline } from "react-icons/ti";
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
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineCloudUpload,
  AiOutlineEyeInvisible,
  AiOutlineExclamationCircle,
  FaClock,
  BiPlus,
  BiLock,
  BiGame,
  BiUser,
  BiMinus,
  BiWorld,
  BiSearch,
  BiChevronsRight,
  BiSelectMultiple,
  BiSend,
  BsGlobe,
  BsThreeDots,
  BsMoonStars,
  BsShieldLock,
  BsFillPlayFill,
  BsNintendoSwitch,
  BsFillArrowUpCircleFill,
  BsSignpostSplit,
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
  FiEdit,
  GoDotFill,
  HiCheck,
  HiOutlineUpload,
  HiMenuAlt2,
  HiChartBar,
  HiOutlineLocationMarker,
  IoMdNotificationsOutline,
  LiaCarSideSolid,
  LiaSignOutAltSolid,
  LuShip,
  MdHome,
  MdClear,
  MdLogin,
  MdCancel,
  MdStorefront,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlineWbSunny,
  MdOutlineExplore,
  MdCurrencyBitcoin,
  MdOutlineDeleteOutline,
  MdOutlineAddCircleOutline,
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
  MdOutlineLocationSearching,
  MdOutlineSwitchAccount,
  MdOutlineCameraAlt,
  GoArrowLeft,
  PiWarningCircle,
  PiWarningCircleBold,
  PiArrowFatLinesUp,
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiArrowUpLine,
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
  SiNintendo,
  TiTimes,
  TiLocationArrowOutline,
};

export const Icon: FC<IconParams> = ({
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
