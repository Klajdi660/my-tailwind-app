import { FunctionComponent, useState } from "react";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import { Image } from "../Image";
import { Language } from "../../Language";
import { alFlag, shFlag } from "../../../assets";
import { useStore } from "../../../hooks";
import { LanguageButtonProps } from "../../../types";
import { Icon } from "../Icon";

export const LanguageButton: FunctionComponent<LanguageButtonProps> = (
  props
) => {
  const [open, setOpen] = useState(false);

  const { userSelectedData } = useSelector(
    (state: any) => state.userSelectedData
  );

  // const { flag, lang, currency } = userSelectedData;

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
          {/* {lang === "al" && (
            <Image imgUrl={alFlag} name="flag_icon" styles="w-5 h-5" />
          )}
          {lang === "en" && (
            <Image imgUrl={shFlag} name="flag_icon" styles="w-5 h-5" />
          )} */}
          {/* <Image imgUrl={userLangData?.flag} /> */}

          {userSelectedData ? (
            <>
              <div className="text-lg">{userSelectedData?.flag}</div>
              <div className="flex flex-col group-hover:text-white">
                <p className="text-xs">{userSelectedData?.lang}/</p>
                <p className="text-xs">{userSelectedData?.currency}</p>
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
