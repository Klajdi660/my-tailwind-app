import { FunctionComponent } from "react";
import { PatternBg, Icon } from "../UI";
import { useAuth } from "../../hooks";
import { UserInfoProps } from "../../types";

export const UserInfo: FunctionComponent<UserInfoProps> = () => {
  const { user } = useAuth();

  const hasProvider = user?.provider !== "Email";

  return (
    <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">User Information</h5>
      </div>
      <p className="flex gap-1 text-sm font-normal text-primary">
        <Icon name="PiWarningCircle" className="text-primary" size={20} />
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
// text-secondary
