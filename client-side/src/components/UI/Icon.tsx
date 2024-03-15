import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import { classNames } from "../../utils";
import { IconParams, IconsMap } from "../../types/general.type";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloudUpload,
  AiOutlineSetting,
  AiOutlineEdit,
} from "react-icons/ai";
import { BiGame, BiSearch, BiUser } from "react-icons/bi";
import { CgGames } from "react-icons/cg";
import { FaGithub, FaOpencart, FaWpexplorer } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdHome,
  MdOutlineExplore,
  MdOutlineGames,
  MdStorefront,
} from "react-icons/md";
import { RiFirefoxLine } from "react-icons/ri";
import { SlGameController, SlSocialDropbox } from "react-icons/sl";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { PiWarningCircleBold } from "react-icons/pi";

const icons: IconsMap = {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloudUpload,
  AiOutlineSetting,
  AiOutlineEdit,
  BiGame,
  BiSearch,
  BiUser,
  CgGames,
  FaGithub,
  FaOpencart,
  FaWpexplorer,
  FcGoogle,
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
  FiUpload,
  HiMenuAlt2,
  IoMdNotificationsOutline,
  MdHome,
  MdOutlineExplore,
  MdOutlineGames,
  MdStorefront,
  RiFirefoxLine,
  SlGameController,
  SlSocialDropbox,
  LiaSignOutAltSolid,
  PiWarningCircleBold,
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
