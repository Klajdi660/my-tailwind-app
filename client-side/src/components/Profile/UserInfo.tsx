import { FC } from "react";
import { Tooltip } from "antd";
import { useStore } from "../../hooks";
import { useAppSelector } from "../../store";
import { Icon, Button } from "../../components";

export const UserInfo: FC = () => {
  const { setModalOpen } = useStore();

  const { user } = useAppSelector((state) => state.user);

  const { email, username, provider } = user;

  const hasProvider = provider !== "Email";

  const emailTooltipTitle = hasProvider ? (
    <>
      <span className="font-bold mr-2">Please note:</span>
      <span className="text-justify">
        You are signed with {provider} account, you can't change your email and
        password.
      </span>
    </>
  ) : (
    <>
      <span className="font-bold mr-2">Please note:</span>
      <span className="text-justify">
        The email is set automatically, you can't change it here.
      </span>
    </>
  );

  return (
    <div className="bg-card md:p-8 p-4 rounded">
      <h5 className="text-lg font-semibold pb-6">Account Information</h5>
      <div className="flex flex-col gap-6">
        <div className="flex_justify_between flex-col items-start gap-2">
          <label className="text-xs text-secondary font-semibold">Email</label>
          <div className="flex_justify_between w-full h-12 px-2 bg-main rounded">
            <p className="text-secondary">{email}</p>
            <Tooltip title={emailTooltipTitle} trigger={["hover"]}>
              <button>
                <Icon
                  name="PiWarningCircle"
                  className="text-secondary hover:text-primary"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="flex_justify_between flex-col items-start gap-2">
          <label className="text-xs text-secondary font-semibold">
            Username
          </label>
          <div className="flex_justify_between flex-row w-full gap-2">
            <div className="flex_justify_start w-full h-12 px-2 bg-main rounded">
              <p className="text-secondary">{username}</p>
            </div>
            <Button
              type="button"
              labelIcon="FiEdit"
              variant="contained"
              className="h-12"
              onClick={() => setModalOpen("changeUsernameModal", true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
