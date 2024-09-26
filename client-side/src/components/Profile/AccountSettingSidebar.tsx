import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { settingsLinks } from "../../data";
import { Icon } from "../UI";
import { classNames } from "../../utils";

export const AccountSettingSidebar: FC = () => {
  const navigate = useNavigate();

  const [selectedSetting, setSelectedSetting] = useState(settingsLinks[0].id);

  const handleLinkClick = (link: string, id: string) => {
    navigate(link);
    setSelectedSetting(id);
  };

  return (
    <div>
      <div className="flex flex-col gap-1 py-8 px-4 bg-card rounded">
        {settingsLinks.map((settingLink) => {
          return (
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
                  selectedSetting.includes(settingLink.id) &&
                    "bg-primary-opacity"
                )}
                onClick={() => handleLinkClick(settingLink.to, settingLink.id)}
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
          );
        })}
      </div>
    </div>
  );
};
