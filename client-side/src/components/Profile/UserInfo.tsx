import { FC, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "antd";
import { Icon, Button } from "../UI";
import { useAppSelector } from "../../store";
import { UserInfoProps } from "../../types";
import { classNames, editUsernameValidation } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorFormMessage } from "../Common";

export const UserInfo: FC<UserInfoProps> = () => {
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const { email, username, provider } = user;

  const hasProvider = provider !== "Email";
  const usernameIcon = !isUpdatingUsername ? "FiEdit" : "BiSend";

  const emailTooltipTitle = hasProvider ? (
    <>
      <span className="font-bold">Please note:</span>{" "}
      <span className="text-justify">
        You are signed with {provider} account, you can't change your email and
        password.
      </span>
    </>
  ) : (
    <>
      <span className="font-bold">Please note:</span>{" "}
      <span className="text-justify">
        The email is set automatically, you can't change it here.
      </span>
    </>
  );

  const usernameTooltipTitle = (
    <>
      <span className="font-bold">Please note:</span>{" "}
      <span className="text-justify">
        If you changed your GrooveIT Games Username, you can't change it again
        for 2 weeks after you confirm this change.
      </span>
    </>
  );

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editUsernameValidation),
  });

  const handleMenuClick = async (data: any) => {
    document.removeEventListener("keydown", handleKeyDown);
  };

  const handleCancleClick = () => {
    setIsUpdatingUsername(true);
    startEditing();
    reset({ username: "" });
  };

  const handleClick = isUpdatingUsername
    ? handleSubmit(handleMenuClick)
    : handleCancleClick;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUpdatingUsername(false);
        reset({ username });
        document.removeEventListener("keydown", handleKeyDown);
      }
    },
    [setIsUpdatingUsername]
  );

  const startEditing = () => {
    setIsUpdatingUsername(true);
    document.addEventListener("keydown", handleKeyDown);
  };

  return (
    <div className="bg-card p-8 rounded">
      <h5 className="text-lg font-semibold pb-6">Account Information</h5>
      <form className="flex flex-col gap-6">
        <div className="">
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
        <div className="">
          <label className="block text-secondary text-xs font-semibold mb-2">
            Username
          </label>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col w-full">
              <div className="relative">
                <input
                  {...form("username")}
                  name="username"
                  className={classNames(
                    "w-full h-12 text-sm text-onNeutralBg rounded px-2 focus-within:border-primary outline-0",
                    isUpdatingUsername
                      ? "bg-transparent border border-divider hover:border-primary"
                      : "bg-main text-secondary",
                    errors["username"] &&
                      "border border-red-500 hover:border-red-500"
                  )}
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  defaultValue={username}
                  disabled={isUpdatingUsername ? false : true}
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
            <Tooltip
              title={isUpdatingUsername ? "" : "Edit username"}
              trigger={["hover"]}
            >
              <Button
                type="button"
                labelIcon={usernameIcon}
                variant="contained"
                onClick={handleClick}
                disabled={isUpdatingUsername && !isValid}
              />
            </Tooltip>
          </div>
          {isUpdatingUsername && (
            <>
              <ErrorFormMessage errorMessage={errors?.["username"]?.message} />
              <p className="text-sm text-secondary mt-1">Press Esc to cancel</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
