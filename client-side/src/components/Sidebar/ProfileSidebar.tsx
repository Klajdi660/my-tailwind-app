import { FC } from "react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components";
import { classNames } from "../../utils";
import { paths, settingsLinks } from "../../data";

export const ProfileSidebar: FC = () => {
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
          onClick={() => navigate(`${paths.ACCOUNT}/${settingLink.id}`)}
        >
          {settingLink.name}
        </Button>
      ))}
    </div>
  );
};
