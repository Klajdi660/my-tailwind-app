import { FunctionComponent } from "react";
import { IconContext } from "react-icons";
import { classNames } from "../../utils";
// import { IconProps } from "../../types/user.type";
import { IconParams, IconsMap } from "../../types/general.type";
// import { Tooltip } from "antd"; 

import { AiFillEye, AiFillEyeInvisible, AiOutlineCloudUpload, AiOutlineSetting, AiOutlineEdit } from "react-icons/ai";
import { BiGame, BiSearch, BiUser } from "react-icons/bi"; 
import { FaGithub, FaWpexplorer } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle, FiEye, FiEyeOff } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi"
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHome, MdOutlineExplore, MdOutlineGames, MdStorefront } from "react-icons/md";
import { RiFirefoxLine } from "react-icons/ri";
import { SlGameController, SlSocialDropbox } from "react-icons/sl";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { PiWarningCircleBold } from "react-icons/pi";

// export const Icon: FunctionComponent<IconProps> = (props)  => {
//   const { styles, imgUrl, disabled, handleClick, isActive, name, type, className } = props;

//   const triggerType = type === "click" ? "click": "hover";
//   const placement = isActive === "Login" ? "bottom" : "right";

//   return (
//     <Tooltip placement={placement} title={name} color="#2C333F" trigger={[triggerType]} arrow={false}>
//       <div 
//         className={`w-8 relative h-8 rounded-[10px] ${isActive && isActive === name ? 'bg-richblack-700' : null} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} ${className}`} 
//         onClick={handleClick}
//       >
//         {!isActive
//           ? <img
//               className='w-1/2 h-1/2' 
//               src={imgUrl} 
//               alt={'fund_logo'} 
//               width={16} 
//               height={16}
//             />
//           : <img
//               src={imgUrl} 
//               alt={'fund_logo'}  
//               className={`w-2/4 h-2/4 ${isActive !== name ? 'grayscale' : null}`}
//             />
//         }
//       </div>
//     </Tooltip>
//   );
// };

interface IconProps {
  imgUrl: string;
  name?: string;
  width?: number;
  styles?: string;
};

export const Icon: FunctionComponent<IconProps> = (props) => {
  const { imgUrl, name, width, styles } = props;

  return (
    <img 
      src={imgUrl} 
      alt={name} 
      width={width}
      className={styles} 
    />
  );
};

const icons: IconsMap = { 
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloudUpload,
  AiOutlineSetting,
  AiOutlineEdit,
  BiGame,
  BiSearch,
  BiUser,
  FaGithub,
  FaWpexplorer,
  FcGoogle,
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
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

export const Icons: FunctionComponent<IconParams> = ({
  name = "MdHome",
  size = 20,
  className = "",
  ...props
}) => {
  const Icon = icons?.[name] || icons?.["MdHome"];

  return (
    <IconContext.Provider
      value={{
        className: classNames("text-onNeutralBg", className),
        ...props,
      }}
    >
      <Icon size={size} />
    </IconContext.Provider>
  );
};
