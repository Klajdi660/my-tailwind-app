import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../Auth";
import { Button, Image } from "../UI";
import { userIcon } from "../../assets";
import { paths, profileList, personalDetailsList } from "../../data";
import { useAuth } from "../../hooks";

interface ProfileProps {}

export const Profile: FunctionComponent<ProfileProps> = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { editProfile } = paths;
  const { firstName, lastName, avatar, contactNumber } = user?.extra;
  const { phonePrefix, phoneNumber } = contactNumber;

  return (
    <div className="flex flex-col gap-y-10 text-onNeutralBg">
      <div className="flex items-center justify-between bg-card rounded p-4 xs:p-6">
        <div className="flex items-center gap-x-4">
          {avatar ? (
            <Image
              imgUrl={avatar}
              name="Profile Img"
              styles="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <Image
              imgUrl={userIcon}
              name="Profile Img"
              styles="w-20 h-20 rounded-full p-1 ring-2 ring-gray-300 bg-main"
            />
          )}
          <div>
            <div className="font-normal capitalize text-base">
              {user?.username}
            </div>
            <div className="text-sm font-normal tracking-wider text-secondary">
              {firstName} {lastName}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          label="Edit profile"
          variant="contained"
          className=""
          onClick={() => {
            navigate(editProfile);
          }}
        />
      </div>
      <div className="relative p-4 xs:p-6 rounded bg-card">
        <div className="mb-5">
          <h5 className="text-lg font-semibold">User Information</h5>
        </div>
        <ProfileForm
          listForm={profileList}
          defaultValues={{
            username: user?.username,
            email: user?.email,
          }}
        />
      </div>
      <div className="relative p-4 xs:p-6 rounded bg-card">
        <div className="mb-5">
          <h5 className="text-lg font-semibold">Personal Details</h5>
        </div>
        <ProfileForm
          listForm={personalDetailsList}
          defaultValues={{
            ...user?.extra,
            contactNumber: `${phonePrefix}${phoneNumber}`,
          }}
        />
      </div>
    </div>
  );
};
