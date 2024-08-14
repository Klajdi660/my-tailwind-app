import { FC } from "react";
import { Icon } from "../UI";
import { useAuth } from "../../hooks";
import { UserInfoProps } from "../../types";

export const UserInfo: FC<UserInfoProps> = () => {
  const { user } = useAuth();

  const hasProvider = user?.provider !== "Email";

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">User Information</h5>
      </div>
      <p className="flex gap-1 text-sm font-normal text-secondary">
        <Icon name="PiWarningCircle" className="text-secondary" size={20} />
        {hasProvider ? (
          <>
            You are signed with {user?.provider} account, you can't change your
            email and password.
          </>
        ) : (
          <>The email is set automatically, you can't change it here.</>
        )}
      </p>
    </div>
  );
};
