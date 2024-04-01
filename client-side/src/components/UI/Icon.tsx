import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import { classNames } from "../../lib";
import { IconParams, IconsMap } from "../../types/general.type";
import {
  AiOutlineCloudUpload,
  AiOutlineSetting,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { BiGame, BiSearch, BiUser, BiWorld } from "react-icons/bi";
import { BsMoonStars, BsNintendoSwitch } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import {
  FaPlaystation,
  FaXbox,
  FaOpencart,
  FaWpexplorer,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdHome,
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
  MdCancel,
} from "react-icons/md";
import { RiFirefoxLine } from "react-icons/ri";
import { SlGameController, SlSocialDropbox } from "react-icons/sl";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { PiWarningCircleBold } from "react-icons/pi";
import { TiTimes } from "react-icons/ti";

const icons: IconsMap = {
  AiOutlineCloudUpload,
  AiOutlineSetting,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  BiGame,
  BiSearch,
  BiUser,
  BiWorld,
  BsMoonStars,
  BsNintendoSwitch,
  CgGames,
  FaPlaystation,
  FaXbox,
  FaOpencart,
  FaWpexplorer,
  FaRegUser,
  FaUser,
  FcGoogle,
  FiAlertTriangle,
  FiUpload,
  HiMenuAlt2,
  IoMdNotificationsOutline,
  MdHome,
  MdOutlineExplore,
  MdOutlineGames,
  MdOutlineWbSunny,
  MdStorefront,
  MdCancel,
  RiFirefoxLine,
  SlGameController,
  SlSocialDropbox,
  LiaSignOutAltSolid,
  PiWarningCircleBold,
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
