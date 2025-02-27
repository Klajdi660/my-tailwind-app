import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components";
import { classNames } from "../../utils";
import { settingsLinks, paths } from "../../data";

export const ProfileSidebar: FC = () => {
  const { profile } = paths;

  const { profileId } = useParams<{ profileId: string | any }>();

  const navigate = useNavigate();

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
                profileId.includes(settingLink.id) && "bg-primary-opacity"
              )}
              onClick={() => navigate(`${profile}/${settingLink.id}`)}
            >
              <Icon
                name={settingLink.icon}
                className={classNames(
                  "group-hover:!text-primary",
                  profileId.includes(settingLink.id) && "text-primary"
                )}
                size={20}
              />
              <div
                className={classNames(
                  "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                  profileId.includes(settingLink.id)
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
