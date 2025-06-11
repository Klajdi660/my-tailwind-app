import { FC } from "react";
import { IconContext } from "react-icons";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
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
} from "react-icons/bi";
import {
  BsGlobe,
  BsThreeDots,
  BsMoonStars,
  BsShieldLock,
  BsSignpostSplit,
  BsGenderAmbiguous,
  BsArrowDownUp,
} from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { CgGames } from "react-icons/cg";
import {
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
  FaStreetView,
  FaCreditCard,
  FaCheck,
  FaRegEdit,
  FaRegCircle,
  FaDotCircle,
} from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
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
import { LuShip, LuArrowDownUp } from "react-icons/lu";
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
  MdOutlineAddCircleOutline,
  MdOutlineLocationSearching,
  MdOutlineSwitchAccount,
  MdOutlineCameraAlt,
  MdOutlineEdit,
  MdOutlineVerifiedUser,
  MdCalendarMonth,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdOutlineSort,
  MdDeleteOutline,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { LiaCoinsSolid } from "react-icons/lia";
import {
  PiWarningCircle,
  PiWarningCircleBold,
  PiKeyholeThin,
} from "react-icons/pi";
import {
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiArrowUpLine,
  RiTimeZoneLine,
  RiDeleteBinLine,
} from "react-icons/ri";
import {
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
} from "react-icons/sl";
import { SiNintendo } from "react-icons/si";
import { TiLocationArrowOutline } from "react-icons/ti";
import { TbUserSquare, TbBuildingWarehouse } from "react-icons/tb";
import { IconParams, IconsMap } from "../../types";
import { classNames } from "../../utils";

const icons: IconsMap = {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineYoutube,
  AiOutlineInstagram,
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
  BsGlobe,
  BsThreeDots,
  BsMoonStars,
  BsShieldLock,
  BsSignpostSplit,
  BsGenderAmbiguous,
  BsArrowDownUp,
  CiShoppingTag,
  CgGames,
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
  FaStreetView,
  FaCirclePlus,
  FaCreditCard,
  FaCcPaypal,
  FaCheck,
  FaRegEdit,
  FaRegCircle,
  FaDotCircle,
  FcGoogle,
  FiUpload,
  FiAlertTriangle,
  FiEdit,
  GoDotFill,
  LiaCoinsSolid,
  HiCheck,
  HiOutlineUpload,
  HiMenuAlt2,
  HiChartBar,
  HiOutlineLocationMarker,
  IoMdNotificationsOutline,
  LiaCarSideSolid,
  LiaSignOutAltSolid,
  LuShip,
  LuArrowDownUp,
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
  MdOutlineAddCircleOutline,
  MdOutlineLocationSearching,
  MdOutlineSwitchAccount,
  MdOutlineCameraAlt,
  MdOutlineEdit,
  MdOutlineVerifiedUser,
  MdCalendarMonth,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdOutlineSort,
  MdDeleteOutline,
  MdOutlineCheckBoxOutlineBlank,
  GoArrowLeft,
  PiWarningCircle,
  PiWarningCircleBold,
  PiKeyholeThin,
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiArrowUpLine,
  RiTimeZoneLine,
  RiDeleteBinLine,
  SlArrowUp,
  SlLocationPin,
  SlSocialDropbox,
  SlGameController,
  SiNintendo,
  TiLocationArrowOutline,
  TbUserSquare,
  TbBuildingWarehouse,
};

export const Icon: FC<IconParams> = ({
  name = "MdHome",
  size = 20,
  className = "text-onNeutralBg",
  onClick,
  ...props
}) => {
  // const Icons = icons?.[name] || icons?.["MdHome"];
  const Icons = name in icons ? icons[name] : icons["MdHome"];

  return (
    <IconContext.Provider
      value={{
        className: classNames(className),
        ...props,
      }}
    >
      <Icons size={size} onClick={onClick} />
    </IconContext.Provider>
  );
};
