import { Popover } from "antd";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { useAppSelector } from "../../../store";
import { Language } from "../../Language";

export const LanguageButton: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLanguageSelect = (language: string) => {
    // setLang(language);
    hide();
  };

  return (
    <div className="items-center hidden h-full lg:flex">
      <Popover
        trigger="click"
        arrow={false}
        content={
          <Language onSelectLanguage={handleLanguageSelect} setOpen={setOpen} />
        }
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button className="flex-row w-16 h-12 gap-2 text-onNeutralBg transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          {user?.extra?.shipTo ? (
            <>
              <div className="text-lg">{user?.extra?.flag}</div>
              <div className="flex flex-col group-hover:text-white">
                <p className="text-xs">{user?.extra?.lang}/</p>
                <p className="text-xs">{user?.extra?.currency}</p>
              </div>
            </>
          ) : (
            <>
              <Icon name="BiWorld" className="group-hover:!text-white" />
            </>
          )}
        </button>
      </Popover>
    </div>
  );
};
