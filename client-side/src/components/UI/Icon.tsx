import { FunctionComponent } from "react";
import { Tooltip } from "antd"; 
import { IconProps } from "../../types/user.type";
import { IconParams, IconsMap } from "../../types/general.type";
import { IconContext } from "react-icons";
import { classNames } from "../../utils";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGithub, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdHome } from "react-icons/md";
import { SlGameController } from "react-icons/sl";

export const Icon: FunctionComponent<IconProps> = (props)  => {
  const { styles, imgUrl, disabled, handleClick, isActive, name, type, className } = props;

  const triggerType = type === "click" ? "click": "hover";
  const placement = isActive === "Login" ? "bottom" : "right";

  return (
    <Tooltip placement={placement} title={name} color="#2C333F" trigger={[triggerType]} arrow={false}>
      <div 
        className={`w-8 relative h-8 rounded-[10px] ${isActive && isActive === name ? 'bg-richblack-700' : null} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} ${className}`} 
        onClick={handleClick}
      >
        {!isActive
          ? <img
              className='w-1/2 h-1/2' 
              src={imgUrl} 
              alt={'fund_logo'} 
              width={16} 
              height={16}
            />
          : <img
              src={imgUrl} 
              alt={'fund_logo'}  
              className={`w-2/4 h-2/4 ${isActive !== name ? 'grayscale' : null}`}
            />
        }
      </div>
    </Tooltip>
  );
};



const icons: IconsMap = { 
  AiFillEye,
  AiFillEyeInvisible,
  FaGithub,
  FcGoogle,
  MdHome, 
  SlGameController,
  FiEye,
  FiEyeOff,
  FaApple,
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
