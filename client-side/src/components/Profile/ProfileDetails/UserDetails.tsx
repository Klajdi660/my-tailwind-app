import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Icon } from "../../UI";
import { paths } from "../../../data";
import { useAppSelector } from "../../../store";
import { userIcon, iconName } from "../../../assets";
import { useProfilePhoto, useAppModal, classNames } from "../../../utils";

export const UserDetails: FC = () => {
  const { editProfile } = paths;

  const { isUpdatingProfileImg, setPhotoType } = useProfilePhoto();
  const { setModalOpen } = useAppModal();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { verified, email, username } = user;
  const { firstName, lastName, avatar } = user.extra;

  const verifyType = verified === "1" ? "Verified" : "Verify now";
  const isVerify = verified === "1";

  const handleProfileModalOpen = () => {
    setPhotoType("profilePhoto");
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
      <div className="flex flex_justify_between">
        <h5 className="text-xl font-semibold">Profile</h5>
        <button
          className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity group"
          onClick={() => navigate(`${editProfile}/account`)}
        >
          <Icon
            name="MdOutlineEdit"
            size={25}
            className="group-hover:text-primary"
          />
        </button>
      </div>
      <div className="flex_justify_start">
        <button
          className="w-40 h-40 rounded-full"
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
    </div>
  );
};
