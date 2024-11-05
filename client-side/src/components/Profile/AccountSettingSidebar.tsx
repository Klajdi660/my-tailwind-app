import { FC } from "react";
import { settingsLinks } from "../../data";
import { Icon } from "../UI";
import { classNames, useSelectedSettings } from "../../utils";

export const AccountSettingSidebar: FC = () => {
  const { setSelectedEditProfileName, selectedSetting, setSelectedSetting } =
    useSelectedSettings();

  const handleLinkClick = (id: string, name: string) => {
    setSelectedSetting(id);
    setSelectedEditProfileName(name);
  };

  return (
    <div>
      <div className="flex flex-col gap-1 py-8 px-4 bg-card rounded">
        {settingsLinks.map((settingLink) => (
          <div
            key={settingLink.id}
            className={classNames(
              `dropdown_${settingLink.id}`,
              "flex items-center group w-full"
            )}
          >
            <button
              className={classNames(
                "flex flex-row items-center gap-2 p-5 h-12 w-full outline-0 border-none hover:bg-primary-opacity rounded",
                selectedSetting.includes(settingLink.id) && "bg-primary-opacity"
              )}
              onClick={() => handleLinkClick(settingLink.id, settingLink.name)}
            >
              <Icon
                name={settingLink.icon}
                className={classNames(
                  "group-hover:!text-primary",
                  selectedSetting.includes(settingLink.id) && "text-primary"
                )}
                size={20}
              />
              <div
                className={classNames(
                  "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                  selectedSetting.includes(settingLink.id)
                    ? "text-primary"
                    : "text-onNeutralBg"
                )}
              >
                {settingLink.name}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
