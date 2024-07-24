import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import {
  AiFillHeart,
  AiFillStar,
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
  AiOutlineDelete,
} from "react-icons/ai";
import {
  BiChevronsRight,
  BiGame,
  BiSearch,
  BiUser,
  BiWorld,
  BiSelectMultiple,
  BiMinus,
  BiPlus,
} from "react-icons/bi";
import {
  BsFillPlayFill,
  BsMoonStars,
  BsNintendoSwitch,
  BsGlobe,
} from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
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
  MdOutlineCancel,
  MdClear,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { PiWarningCircle, PiWarningCircleBold } from "react-icons/pi";
import { RiFirefoxLine, RiInstagramFill } from "react-icons/ri";
import { SlGameController, SlSocialDropbox, SlArrowUp } from "react-icons/sl";
import { SiNintendo } from "react-icons/si";
import { TiTimes } from "react-icons/ti";
import { IconParams, IconsMap } from "../../types";
import { classNames } from "../../utils";

const icons: IconsMap = {
  AiFillHeart,
  AiFillStar,
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
  AiOutlineDelete,
  BiChevronsRight,
  BiGame,
  BiSearch,
  BiUser,
  BiWorld,
  BiSelectMultiple,
  BiMinus,
  BiPlus,
  BsFillPlayFill,
  BsMoonStars,
  BsNintendoSwitch,
  CiShoppingTag,
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
  MdOutlineCancel,
  MdClear,
  GoArrowLeft,
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
