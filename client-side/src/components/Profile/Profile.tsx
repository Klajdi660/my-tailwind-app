import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../Auth";
import { Button, Icon, Image } from "../UI";
import { userIcon, iconName } from "../../assets";
import { paths, profileList, personalDetailsList } from "../../data";
import { useAppSelector } from "../../store";
import { useProfilePhoto, classNames } from "../../utils";
import { Tooltip } from "antd";

interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  const { isUpdatingProfileImg } = useProfilePhoto();

  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const { editProfile } = paths;
  const { firstName, lastName, avatar, contactNumber } = user?.extra;

  return (
    // <div className="flex flex-col gap-y-10 text-onNeutralBg">
    //   <div className="flex items-center justify-between bg-card rounded p-4 xs:p-6">
    //     <div className="flex items-center gap-x-4">
    //       {avatar ? (
    //         <Image
    //           imgUrl={avatar}
    //           name="Profile Img"
    //           styles="w-20 h-20 rounded-full object-cover"
    //         />
    //       ) : (
    //         <Image
    //           imgUrl={userIcon}
    //           name="Profile Img"
    //           styles="w-20 h-20 rounded-full p-1 ring-2 ring-gray-300 bg-main"
    //         />
    //       )}
    //       <div>
    //         <div className="font-normal capitalize text-base">
    //           {user?.username}
    //         </div>
    //         <div className="text-sm font-normal tracking-wider text-secondary">
    //           {firstName} {lastName}
    //         </div>
    //       </div>
    //     </div>
    //     <Button
    //       type="submit"
    //       label="Edit profile"
    //       variant="contained"
    //       className=""
    //       onClick={() => {
    //         navigate(editProfile);
    //       }}
    //     />
    //   </div>
    //   <div className="relative p-4 xs:p-6 rounded bg-card">
    //     <div className="mb-5">
    //       <h5 className="text-lg font-semibold">User Information</h5>
    //     </div>
    //     <ProfileForm
    //       listForm={profileList}
    //       defaultValues={{
    //         username: user?.username,
    //         email: user?.email,
    //       }}
    //     />
    //   </div>
    //   <div className="relative p-4 xs:p-6 rounded bg-card">
    //     <div className="mb-5">
    //       <h5 className="text-lg font-semibold">Personal Details</h5>
    //     </div>
    //     <ProfileForm
    //       listForm={personalDetailsList}
    //       defaultValues={{
    //         ...user?.extra,
    //         contactNumber:
    //           contactNumber &&
    //           `${contactNumber?.phonePrefix}${contactNumber?.phoneNumber}`,
    //       }}
    //     />
    //   </div>
    // </div>

    <div className="bg-card rounded h-[400px]">
      <div className="h-[200px] bg-gray-300 rounded-t-lg relative">
        <div className="flex flex-col items-center md:flex-row absolute top-10 left-6">
          <div className="flex gap-5 items-center">
            <div className="relative w-52 h-52 rounded-full ring-1 ring-white bg-white">
              {avatar ? (
                <Image
                  imgUrl={avatar}
                  name="Profile Img"
                  styles="w-52 h-52 rounded-full p-1 object-cover"
                />
              ) : (
                <Image
                  imgUrl={userIcon}
                  name="Profile Img"
                  styles="w-52 h-52 rounded-full p-1 ring-1 ring-white bg-main"
                />
              )}
              {isUpdatingProfileImg && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Image imgUrl={iconName} name="Loading Img" width={120} />
                  </div>
                  <div className="absolute inset-1 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full" />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 absolute right-6 top-6">
          <button
            className={classNames(
              // "flex_justify_center h-12 w-12 rounded-full border-2 border-onNeutralBg shadow-lg hover:border-primary transition duration-300 group"
              "flex_justify_center h-10 w-10 rounded-full bg-primary-opacity hover:bg-primary group"
            )}
          >
            <Icon
              name="MdOutlineCameraAlt"
              size={20}
              className={classNames(
                "text-onNeutralBg group-hover:text-white transition duration-300"
              )}
            />
          </button>
        </div>
      </div>
      {/* <div className="flex justify-end bg-gray-300 h-40 p-4 rounded-t-lg">
        <div className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center bg-primary-opacity group hover:bg-primary cursor-pointer">
          <Icon name="MdOutlineCameraAlt" className="group-hover:text-white" />
        </div>
      </div>
      <div className="px-4">
        <div className="relative w-52 h-52 rounded-full ring-2 ring-gray-300">
          {avatar ? (
            <Image
              imgUrl={avatar}
              name="Profile Img"
              styles="w-52 h-52 rounded-full p-1 object-cover"
            />
          ) : (
            <Image
              imgUrl={userIcon}
              name="Profile Img"
              styles="w-52 h-52 rounded-full p-1 ring-2 ring-gray-300 bg-main"
            />
          )}
          {isUpdatingProfileImg && (
            <>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Image imgUrl={iconName} name="Loading Img" width={120} />
              </div>
              <div className="absolute inset-1 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full" />
            </>
          )}
        </div>
      </div> */}
    </div>
  );
};
