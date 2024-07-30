import { FunctionComponent, useState } from "react";
import { Popover } from "antd";
import { Image } from "../Image";
import { Language } from "../../Language";
import { alFlag, shFlag } from "../../../assets";
import { useStore } from "../../../hooks";
import { LanguageButtonProps } from "../../../types";

export const LanguageButton: FunctionComponent<LanguageButtonProps> = (
  props
) => {
  const { lang, setLang } = useStore();

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLanguageSelect = (language: string) => {
    setLang(language);
    hide();
  };

  return (
    <div className="items-center hidden h-full lg:flex">
      <Popover
        trigger="click"
        arrow={false}
        content={<Language onSelectLanguage={handleLanguageSelect} />}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group">
          {lang === "al" && (
            <Image imgUrl={alFlag} name="flag_icon" styles="w-5 h-5" />
          )}
          {lang === "en" && (
            <Image imgUrl={shFlag} name="flag_icon" styles="w-5 h-5" />
          )}
        </button>
      </Popover>
    </div>
  );
};
