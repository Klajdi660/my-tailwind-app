import { FunctionComponent } from "react";
import { Tooltip } from "antd"; 
import { IconProps } from "../../types/user.type";

export const Icon: FunctionComponent<IconProps> = (props)  => {
  const { styles, imgUrl, disabled, handleClick, isActive, name, type } = props;

  const triggerType = type === "click" ? "click": "hover";
  const placement = isActive === "Login" ? "bottom" : "right";

  return (
    <Tooltip placement={placement} title={name} color="#2c2f32" trigger={[triggerType]}>
      <div 
        className={`w-8 relative h-8 rounded-[10px] ${isActive && isActive === name ? 'bg-[#2c2f32]' : null} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} 
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
