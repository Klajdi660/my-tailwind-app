import { FunctionComponent } from "react";
import { PatternBg, Title } from "../UI";
interface UserInfoProps {}

export const UserInfo: FunctionComponent<UserInfoProps> = () => {
  return (
    <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">User Information</h5>
      </div>
      <p className="-mt-2 text-sm font-normal tracking-wider text-secondary">
        Here you can edit public information about yourself. If you signed in
        with Google, GitHub or Linkedin, you can't change your email and
        password.
      </p>
    </div>
  );
};
