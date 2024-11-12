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

  const handleCoverModalOpen = () => {
    setPhotoType("cover");
    setModalOpen("changeCoverPhotoModal", true);
  };

  const handleProfileModalOpen = () => {
    setPhotoType("profilPhoto");
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="relative bg-card rounded">
      <div className="relative h-52 bg-neutral-300 rounded">
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
            className="text-[#404040] bg-white group-hover:text-primary"
            iconClassName="group-hover:text-primary"
            onClick={handleCoverModalOpen}
          />
        </div>
      </div>
      <div className="relative flex justify-between items-center px-8 mt-[-50px]">
        <button
          className="relative w-40 h-40 rounded-full ring-1 ring-white bg-white"
          onClick={handleProfileModalOpen}
        >
          {avatar ? (
            <Image
              imgUrl={avatar}
              name="Profile Img"
              styles="w-40 h-40 rounded-full p-1 object-cover"
              effect="blur"
            />
          ) : (
            <div className="relative">
              <Image
                imgUrl={userIcon}
                name="Profile Img"
                styles="w-40 h-40 rounded-full p-1 ring-1 ring-white bg-main"
                effect="blur"
              />
              {/* <button className="flex_justify_center absolute bottom-2 right-2 w-10 h-10 rounded-full bg-card border border-divider group z-[10]">
                <Icon
                  name="MdOutlineCameraAlt"
                  className="group-hover:text-primary"
                />
              </button> */}
            </div>
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
        </button>
        <button
          className="flex flex_justify_center w-8 h-8 rounded-full cursor-pointer hover:bg-primary-opacity"
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
          <button
            className="text-2xl font-semibold rounded hover:bg-primary-opacity"
            onClick={() => setModalOpen("profileNameModal", true)}
          >
            {firstName} {lastName}
          </button>
          <button
            className={classNames(
              "flex items-center gap-1 px-4 text-primary rounded-full border border-dashed",
              isVerify
                ? "border-green-600 text-green-600"
                : "border border-primary"
            )}
            disabled={isVerify}
          >
            <Icon
              name="MdOutlineVerifiedUser"
              className={classNames(
                isVerify ? "text-green-600" : "text-primary"
              )}
              size={16}
            />
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
