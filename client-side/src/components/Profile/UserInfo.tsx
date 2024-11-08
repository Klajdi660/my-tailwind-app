import { FC } from "react";
import { Tooltip } from "antd";
import { Icon, Button } from "../UI";
import { useAppSelector } from "../../store";
import { classNames, useAppModal } from "../../utils";

export const UserInfo: FC = () => {
  const { setModalOpen } = useAppModal();

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

  const usernameTooltipTitle = (
    <p>
      <span className="font-bold mr-2">Please note:</span>
      <span className="text-justify">
        If you changed your GrooveIT Games Username, you can't change it again
        for 2 weeks after you confirm this change.
      </span>
    </p>
  );

  const handleMenuClick = async () => {
    setModalOpen("changeUsernameModal", true);
  };

  return (
    <div className="bg-card p-8 rounded">
      <h5 className="text-lg font-semibold pb-6">Account Information</h5>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-secondary text-xs font-semibold mb-2">
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              className={classNames(
                "w-full h-12 text-sm rounded px-2 focus-within:border-primary outline-0",
                email
                  ? "bg-main text-secondary"
                  : "bg-transparent text-onNeutralBg border border-divider"
              )}
              type="text"
              placeholder="Enter email"
              autoComplete="email"
              defaultValue={email}
              disabled={true}
            />
            <Tooltip title={emailTooltipTitle} trigger={["hover"]}>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Icon
                  name="PiWarningCircle"
                  className="text-secondary hover:text-primary"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <label className="block text-secondary text-xs font-semibold mb-2">
            Username
          </label>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col w-full">
              <div className="relative">
                <input
                  name="username"
                  className="w-full h-12 text-sm text-onNeutralBg rounded px-2 focus-within:border-primary outline-0 bg-main text-secondary"
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  defaultValue={username}
                />
                <Tooltip title={usernameTooltipTitle} trigger={["hover"]}>
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Icon
                      name="PiWarningCircle"
                      className="text-secondary hover:text-primary"
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
            <Button
              type="button"
              labelIcon="FiEdit"
              variant="contained"
              onClick={handleMenuClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
