import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { Button, Icon, Image } from "../UI";
import { userIcon, iconName, noCardTypeImg } from "../../assets";
import { paths, cardImg } from "../../data";
import { useAppSelector } from "../../store";
import {
  useProfilePhoto,
  classNames,
  useAppModal,
  maskCardNumber,
  useSelectedSettings,
} from "../../utils";
import { NewCardContent } from "../Settings";

interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  const { setSelectedSetting } = useSelectedSettings();
  const { isUpdatingProfileImg, setPhotoType } = useProfilePhoto();
  const { setModalOpen } = useAppModal();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const { cardItems } = useAppSelector((state) => state.settingCard);

  const { editProfile } = paths;
  const { verified, email, username } = user;
  const {
    firstName,
    lastName,
    avatar,
    cover,
    dateOfBirth,
    gender,
    contactNumber,
    country,
    city,
    address,
    postalCode,
  } = user.extra;

  const { phonePrefix, phoneNumber } = contactNumber || {};

  const verifyType = verified === "1" ? "Verified" : "Verify now";
  const isVerify = verified === "1";
  console.log("isVerify :>> ", isVerify);

  const handleModalOpen = () => {
    setPhotoType("cover");
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <>
      <div className="relative bg-card rounded">
        <div className="relative h-52 bg-gray-200 rounded">
          {cover && (
            <Image
              imgUrl={cover}
              name="Cover Photo"
              styles="w-full h-full object-cover rounded-t"
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
              />
            ) : (
              <Image
                imgUrl={userIcon}
                name="Profile Img"
                styles="w-40 h-40 rounded-full p-1 ring-1 ring-white bg-main"
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
              <Icon
                name="MdOutlineVerifiedUser"
                className={classNames(
                  isVerify ? "text-[#16a34a]" : "text-primary"
                )}
                size={18}
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
      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Personal Details</h5>
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
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </button>
            <div>
              <p className="text-secondary">First Name</p>
              <p>{firstName}</p>
            </div>
          </div>
          <div className="flex w-full gap-4 ">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </button>
            <div>
              <p className="text-secondary">Last Name</p>
              <p>{lastName}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdCalendarMonth" />
            </button>
            <div>
              <p className="text-secondary">Birthday</p>
              <p>{dateOfBirth}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsGenderAmbiguous" />
            </button>
            <div>
              <p className="text-secondary">Gender</p>
              <p>{gender}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdPhoneIphone" />
            </button>
            <div>
              <p className="text-secondary">Contact Number</p>
              <p>
                {phonePrefix}
                {phoneNumber}
              </p>
            </div>
          </div>
          <div className="w-full"></div>
        </div>

        <h5 className="text-xl font-semibold pt-6">Address Details</h5>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4 ">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdOutlineLocationSearching" />
            </button>
            <div>
              <p className="text-secondary">Country</p>
              <p>{country}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TiLocationArrowOutline" />
            </button>
            <div>
              <p className="text-secondary">City</p>
              <p>{city}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="SlLocationPin" />
            </button>
            <div>
              <p className="text-secondary">Address Line</p>
              <p>{address}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsSignpostSplit" />
            </button>
            <div>
              <p className="text-secondary">Postal Code</p>
              <p>{postalCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Shipping Details</h5>
          <button
            className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity"
            onClick={() => {
              navigate(editProfile);
              setSelectedSetting("shipping-settings");
            }}
          >
            <Icon name="MdOutlineEdit" size={28} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </button>
            <div>
              <p className="text-secondary">Full Name</p>
              <p>Full Name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdPhoneIphone" />
            </button>
            <div>
              <p className="text-secondary">Contact Number</p>
              <p>Contact Number</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdOutlineLocationSearching" />
            </button>
            <div>
              <p className="text-secondary">Counrty</p>
              <p>Country Name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TiLocationArrowOutline" />
            </button>
            <div>
              <p className="text-secondary">State</p>
              <p>State Name</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="SlLocationPin" />
            </button>
            <div>
              <p className="text-secondary">City</p>
              <p>City Name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaStreetView" />
            </button>
            <div>
              <p className="text-secondary">Street</p>
              <p>Street Name</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TbBuildingWarehouse" />
            </button>
            <div>
              <p className="text-secondary">Build Number</p>
              <p>Build Number</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsSignpostSplit" />
            </button>
            <div>
              <p className="text-secondary">Zip Code</p>
              <p>Zip Code</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Payment Details</h5>
          <button
            className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity"
            onClick={() => {
              navigate(editProfile);
              setSelectedSetting("payment-settings");
            }}
          >
            <Icon name="MdOutlineEdit" size={28} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          <div className="flex w-full gap-4 ">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BiWorld" />
            </button>
            <div>
              <p className="text-secondary">Language</p>
              <p>Language Type</p>
            </div>
          </div>
          <div className="flex w-full gap-4 ">
            <button className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="LiaCoinsSolid" size={22} />
            </button>
            <div>
              <p className="text-secondary">Currency</p>
              <p>Currency Type</p>
            </div>
          </div>
        </div>
        {cardItems.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {cardItems.map((cardItem: any) => {
              const {
                cardCvvNumber,
                cardMonth,
                cardYear,
                cardName,
                cardNumber,
                cardType,
                typeOfCard,
                id,
              } = cardItem;

              return (
                <div
                  key={id}
                  className="flex flex-col gap-6 p-6 bg-primary-opacity rounded text-onNeutralBg"
                >
                  <div className="w-full flex_justify_between h-10">
                    <p className="text-lg font-bold">{cardName}</p>
                    <div className="w-20">
                      <Image
                        imgUrl={
                          cardImg[cardType] ? cardImg[cardType] : noCardTypeImg
                        }
                        name="bank_img"
                      />
                    </div>
                  </div>
                  <div className="w-full flex_justify_between">
                    <p className="flex flex-col text-lg font-bold">
                      {maskCardNumber(cardNumber)}
                      <span className="text-sm font-normal">
                        {cardNumber.slice(0, 4)}
                      </span>
                    </p>
                    <p className="text-md font-bold">{typeOfCard}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-secondary">Valid Thru</p>
                        <p>
                          {cardMonth}/{cardYear}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary">CVV</p>
                        <p>{cardCvvNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Popover
                        arrow={false}
                        content={<NewCardContent cardId={id} />}
                      >
                        <button className="hover:bg-primary-opacity rounded-full p-1">
                          <Icon name="BsThreeDots" />
                        </button>
                      </Popover>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
