import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import { classNames } from "../../utils";
import { IconParams, IconsMap } from "../../types/general.type";
import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BiGame, BiSearch, BiUser, BiWorld } from "react-icons/bi";
import { BsMoonStars, BsNintendoSwitch } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import {
  FaOpencart,
  FaPlaystation,
  FaRegUser,
  FaUser,
  FaWpexplorer,
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
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
} from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";
import { RiFirefoxLine } from "react-icons/ri";
import { SlGameController, SlSocialDropbox, SlArrowUp } from "react-icons/sl";
import { TiTimes } from "react-icons/ti";

const icons: IconsMap = {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
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
  FaOpencart,
  FaPlaystation,
  FaRegUser,
  FaUser,
  FaWpexplorer,
  FaXbox,
  FcGoogle,
  FiAlertTriangle,
  FiUpload,
  HiMenuAlt2,
  IoMdNotificationsOutline,
  LiaSignOutAltSolid,
  MdCancel,
  MdCurrencyBitcoin,
  MdHome,
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
  PiWarningCircleBold,
  RiFirefoxLine,
  SlGameController,
  SlSocialDropbox,
  SlArrowUp,
  TiTimes,
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
