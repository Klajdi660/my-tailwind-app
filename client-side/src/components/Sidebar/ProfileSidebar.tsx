import { FC } from "react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components";
import { paths, settingsLinks } from "../../data";
import { classNames } from "../../utils";

export const ProfileSidebar: FC = () => {
  const { PROFILE } = paths;

  const { profileId } = useParams<{ profileId: string | any }>();

  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {settingsLinks.map((settingLink) => (
        <Button
          className={classNames(
            profileId === settingLink.id
              ? "bg-primary-opacity text-primary"
              : "bg-card",
            "flex items-center gap-2",
          )}
          variant="filled"
          color="default"
          key={settingLink.id}
          icon={<Icon name={settingLink.icon} />}
          onClick={() => navigate(`${PROFILE}/${settingLink.id}`)}
        >
          {settingLink.name}
        </Button>
      ))}
    </div>
  );
};
