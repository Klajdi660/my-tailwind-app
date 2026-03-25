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
  AiOutlineExclamationCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import {
  BiPlus,
  BiLock,
  BiGame,
  BiMinus,
  BiSearch,
  BiChevronsRight,
  BiSelectMultiple,
} from "react-icons/bi";
import {
  BsGlobe,
  BsThreeDots,
  BsShieldLock,
  BsThreeDotsVertical,
  BsNintendoSwitch,
} from "react-icons/bs";
import { CiShoppingTag, CiEdit } from "react-icons/ci";
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
  FaCreditCard,
  FaCheck,
  FaRegCircle,
  FaDotCircle,
} from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
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
  AiOutlineEyeInvisible,
  AiOutlineExclamationCircle,
  AiOutlineWarning,
  FaClock,
  BiPlus,
  BiLock,
  BiGame,
  BiMinus,
  BiSearch,
  BiChevronsRight,
  BiSelectMultiple,
  BsGlobe,
  BsNintendoSwitch,
  BsThreeDots,
  BsShieldLock,
  BsThreeDotsVertical,
  CiShoppingTag,
  CiEdit,
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
  FaCirclePlus,
  FaCreditCard,
  FaCcPaypal,
  FaCheck,
  FaRegCircle,
  FaDotCircle,
  FcGoogle,
  FiUpload,
  FiAlertTriangle,
  FiEdit,
  HiCheck,
  HiOutlineUpload,
  HiMenuAlt2,
  HiChartBar,
  HiOutlinePencil,
  IoWalletOutline,
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
  MdOutlineExplore,
  MdOutlineSwitchAccount,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdOutlineVerifiedUser,
  MdOutlineSort,
  MdOutlineCheckCircleOutline,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckCircle,
  MdKeyboardArrowDown,
  MdOutlineLocationOn,
  GoArrowLeft,
  PiWarningCircle,
  PiWarningCircleBold,
  PiKeyholeThin,
  RiFirefoxLine,
  RiInstagramFill,
  RiSecurePaymentLine,
  RiDeleteBinLine,
  SlLocationPin,
  SlSocialDropbox,
  IoCloseCircleOutline,
  MdOutlineMail,
  MdOutlinePhoneAndroid,
  TbTransactionDollar,
  GrTransaction,
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
