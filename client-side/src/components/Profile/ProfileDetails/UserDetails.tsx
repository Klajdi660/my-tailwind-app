import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button, Icon } from "../../UI";
import {
  useProfilePhoto,
  useAppModal,
  classNames,
  useSelectedSettings,
} from "../../../utils";
import { paths } from "../../../data";
import { useAppSelector } from "../../../store";
import { userIcon, iconName } from "../../../assets";

export const UserDetails: FC = () => {
  const { editProfile } = paths;

  const { setSelectedSetting } = useSelectedSettings();
  const { isUpdatingProfileImg, setPhotoType } = useProfilePhoto();
  const { setModalOpen } = useAppModal();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { verified, email, username } = user;
  const { firstName, lastName, avatar, cover } = user.extra;

  const verifyType = verified === "1" ? "Verified" : "Verify now";
  const isVerify = verified === "1";

  const handleModalOpen = () => {
    setPhotoType("cover");
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="relative bg-card rounded">
      <div className="relative h-52 bg-gray-200 rounded">
        {cover && (
          <Image
            imgUrl={cover}
            name="Cover Photo"
            styles="w-full h-full object-cover rounded-t"
            effect="blur"
          />
        )}
        <div className="absolute top-8 right-8 group">
          <Button
            variant="none"
            label="Add cover photo"
            labelIcon="MdOutlineCameraAlt"
            className="text-onNeutralBg bg-primary-opacity group-hover:bg-primary group-hover:text-white"
            iconClassName="group-hover:text-white"
            onClick={handleModalOpen}
          />
        </div>
      </div>
      <div className="relative flex justify-between items-center px-8 mt-[-50px]">
        <div className="relative w-40 h-40 rounded-full ring-2 ring-white bg-white">
          {avatar ? (
            <Image
              imgUrl={avatar}
              name="Profile Img"
              styles="w-40 h-40 rounded-full p-1 object-cover"
              effect="blur"
            />
          ) : (
            <Image
              imgUrl={userIcon}
              name="Profile Img"
              styles="w-40 h-40 rounded-full p-1 ring-1 ring-white bg-main"
              effect="blur"
            />
          )}
          {isUpdatingProfileImg && (
            <>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Image
                  imgUrl={iconName}
                  name="Loading Img"
                  width={120}
                  effect="blur"
                />
              </div>
              <div className="absolute inset-1 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full" />
            </>
          )}
        </div>
        <button
          className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity"
          onClick={() => {
            navigate(editProfile);
            setSelectedSetting("account-settings");
          }}
        >
          <Icon name="MdOutlineEdit" size={28} />
        </button>
      </div>
      <div className="flex flex-col gap-4 p-8 text-onNeutralBg">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold">
            {firstName} {lastName}
          </p>
          <button
            className={classNames(
              "flex items-center px-3 py-0.5 text-primary rounded-full border border-dashed",
              isVerify
                ? "border-green-600 text-green-600"
                : "border border-primary"
            )}
            disabled={isVerify}
          >
            {/* <Icon
          name="MdOutlineVerifiedUser"
          className={classNames(
            isVerify ? "text-green-600" : "text-primary"
          )}
          size={18}
        /> */}
            <p
              className={classNames(
                isVerify ? "text-green-600" : "text-primary"
              )}
            >
              {verifyType}
            </p>
          </button>
        </div>
        <div className="flex gap-4">
          <p className="flex gap-2">
            <Icon name="AiOutlineMail" />
            {email}
          </p>
          <p className="flex gap-2">
            <Icon name="TbUserSquare" />
            {username}
          </p>
        </div>
      </div>
    </div>
  );
};
