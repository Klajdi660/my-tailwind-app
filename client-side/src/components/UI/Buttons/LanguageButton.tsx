import { Popover } from "antd";
import { FunctionComponent, useState } from "react";
import { Icon } from "../Icon";
import { useAuth } from "../../../hooks";
import { Language } from "../../Language";
import { LanguageButtonProps } from "../../../types";

export const LanguageButton: FunctionComponent<LanguageButtonProps> = (
  props
) => {
  const { user } = useAuth();
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
        <button className="flex-row w-14 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
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
