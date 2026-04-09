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
import { FaCirclePlus } from "react-icons/fa6";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { HiMenuAlt2, HiCheck, HiOutlineUpload } from "react-icons/hi";
import { HiChartBar, HiOutlineTrophy } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LiaSignOutAltSolid, LiaCarSideSolid } from "react-icons/lia";
import { LuShip, LuArrowDownUp } from "react-icons/lu";
import {
  MdHome,
  MdClear,
  MdCancel,
  MdStorefront,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlineExplore,
  MdOutlineTv,
  MdOutlineFileDownload,
  MdTravelExplore,
  MdChildFriendly,
  MdOutlineSwitchAccount,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdOutlineSort,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckCircle,
  MdKeyboardArrowDown,
  MdOutlineVerifiedUser,
  MdOutlinePlayCircle,
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
} from "react-icons/ri";
import { SlLocationPin, SlSocialDropbox } from "react-icons/sl";
import { TbShoppingBag } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { classNames } from "../../utils";
import { IconParams, IconsMap } from "../../types";

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
  BsThreeDots,
  BsShieldLock,
  BiChevronsRight,
  BiSelectMultiple,
  BsNintendoSwitch,
  CiEdit,
  CgGames,
  CiShoppingTag,
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
  HiCheck,
  HiMenuAlt2,
  HiChartBar,
  HiOutlineTrophy,
  HiOutlineUpload,
  IoMdNotificationsOutline,
  LuShip,
  LuArrowDownUp,
  LiaCarSideSolid,
  LiaSignOutAltSolid,
  MdHome,
  MdClear,
  MdCancel,
  MdStorefront,
  MdOutlineSort,
  MdPhoneIphone,
  MdOutlineGames,
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlineExplore,
  MdOutlineTv,
  MdOutlineFileDownload,
  MdTravelExplore,
  MdChildFriendly,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlinePlayCircle,
  MdOutlineCheckCircle,
  MdOutlineVerifiedUser,
  MdOutlineSwitchAccount,
  MdOutlineCheckBoxOutlineBlank,
  PiKeyholeThin,
  PiWarningCircle,
  PiWarningCircleBold,
  RiFirefoxLine,
  RiInstagramFill,
  RxHamburgerMenu,
  RiSecurePaymentLine,
  SlLocationPin,
  SlSocialDropbox,
  IoCloseCircleOutline,
  TbShoppingBag,
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
