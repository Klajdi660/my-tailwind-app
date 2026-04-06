import { FC } from "react";
import { IconContext } from "react-icons";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import {
  BiPlus,
  BiLock,
  BiGame,
  BiMinus,
  BiSearch,
  BiWifi,
  BiChevronsRight,
  BiSelectMultiple,
} from "react-icons/bi";
import {
  BsGlobe,
  BsThreeDots,
  BsShieldLock,
  BsNintendoSwitch,
} from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { CiShoppingTag, CiEdit } from "react-icons/ci";
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
  FaCreditCard,
  FaCheck,
  FaRegCircle,
  FaDotCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FiAlertTriangle, FiUpload, FiEdit } from "react-icons/fi";

import {
  HiMenuAlt2,
  HiCheck,
  HiOutlineUpload,
  HiOutlinePencil,
} from "react-icons/hi";
import { HiChartBar } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseCircleOutline, IoWalletOutline } from "react-icons/io5";
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
  MdOutlineExplore,
  MdOutlineSwitchAccount,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdOutlineSort,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckCircleOutline,
  MdOutlineCheckCircle,
  MdKeyboardArrowDown,
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlinePhoneAndroid,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import {
  PiWarningCircle,
  PiWarningCircleBold,
  PiKeyholeThin,
} from "react-icons/pi";
import {
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiDeleteBinLine,
} from "react-icons/ri";
import { SlLocationPin, SlSocialDropbox } from "react-icons/sl";
import { TbTransactionDollar } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

import { IconParams, IconsMap } from "../../types";
import { classNames } from "../../utils";

const icons: IconsMap = {
  AiFillStar,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineWarning,
  AiOutlineEyeInvisible,
  BiPlus,
  BiLock,
  BiGame,
  BiMinus,
  BsGlobe,
  BiSearch,
  BiWifi,
  BsThreeDots,
  BsShieldLock,
  BiChevronsRight,
  BiSelectMultiple,
  BsNintendoSwitch,
  CiEdit,
  CgGames,
  CiShoppingTag,
  FiEdit,
  FaXbox,
  FaCheck,
  FaApple,
  FaClock,
  FaLinux,
  FaTiktok,
  FcGoogle,
  FiUpload,
  FaYoutube,
  FaAndroid,
  FaWindows,
  FaRegUser,
  FaCcPaypal,
  FaFacebook,
  FaOpencart,
  FaRegCircle,
  FaDotCircle,
  FaCreditCard,
  FaCirclePlus,
  FaWpexplorer,
  FaPlaystation,
  FiAlertTriangle,
  GoArrowLeft,
  GrTransaction,
  GiHamburgerMenu,
  HiCheck,
  HiMenuAlt2,
  HiChartBar,
  HiOutlineUpload,
  HiOutlinePencil,
  IoWalletOutline,
  IoMdNotificationsOutline,
  LuShip,
  LuArrowDownUp,
  LiaCarSideSolid,
  LiaSignOutAltSolid,
  MdHome,
  MdClear,
  MdLogin,
  MdCancel,
  MdStorefront,
  MdOutlineMail,
  MdOutlineSort,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlineExplore,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdOutlineLocationOn,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCheckCircle,
  MdOutlineVerifiedUser,
  MdOutlinePhoneAndroid,
  MdOutlineSwitchAccount,
  MdOutlineCheckCircleOutline,
  MdOutlineCheckBoxOutlineBlank,
  PiKeyholeThin,
  PiWarningCircle,
  PiWarningCircleBold,
  RiFirefoxLine,
  RiInstagramFill,
  RiDeleteBinLine,
  RxHamburgerMenu,
  RiSecurePaymentLine,
  SlLocationPin,
  SlSocialDropbox,
  IoCloseCircleOutline,
  TbTransactionDollar,
};

export const Icon: FC<IconParams> = ({
  name = "MdHome",
  size = 20,
  className = "text-onNeutralBg",
  onClick,
  ...props
}) => {
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
