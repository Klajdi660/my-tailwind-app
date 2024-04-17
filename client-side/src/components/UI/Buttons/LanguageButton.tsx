import { FunctionComponent, useState } from "react";
import { Icon } from "../Icon";
import { Popover } from "antd";
import { Language } from "../../Language";
import { Image } from "../Image";
import { alFlag, shFlag } from "../../../assets";

interface LanguageButtonProps {}

export const LanguageButton: FunctionComponent<LanguageButtonProps> = (
  props
) => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    hide();
  };

  return (
    <div className="items-center hidden h-full lg:flex">
      <Popover
        trigger="click"
        arrow={false}
        // content={<Language hidden={hide} />}
        content={<Language onSelectLanguage={handleLanguageSelect} />} // Pass language selection callback
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          {/* Display flag based on selected language */}
          {selectedLanguage === "al" && (
            <Image imgUrl={alFlag} name="flag_icon" styles="w-5 h-5" />
          )}
          {selectedLanguage === "sh" && (
            <Image imgUrl={shFlag} name="flag_icon" styles="w-5 h-5" />
          )}
          {!selectedLanguage && (
            <Icon name="BiWorld" className="group-hover:!text-white" />
          )}
        </button>
      </Popover>
    </div>
  );
};
