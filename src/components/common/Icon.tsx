import { Tooltip } from "antd";

const Icon = ({ styles, imgUrl, disabled, handleClick, isActive, name }: any)  => {
  return (
    <Tooltip placement="right" title={name} color="#2c2f32" arrow={false}>
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
              className={`w-3/4 h-3/4 ${isActive !== name ? 'grayscale' : null}`}
            />
        }
      </div>
    </Tooltip>
  );
};

export default Icon;
