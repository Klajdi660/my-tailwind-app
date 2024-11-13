import { FC } from "react";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "./ProfileDetails";
import { Icon, Image } from "../UI";
import { NewCardContent } from "../Settings";
import { paths, cardImg } from "../../data";
import { useAppSelector } from "../../store";
import { noCardTypeImg } from "../../assets";
import { maskCardNumber, useSelectedSettings } from "../../utils";

export const Profile: FC = () => {
  const { editProfile } = paths;

  const { setSelectedSetting } = useSelectedSettings();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const { cardItems } = useAppSelector((state) => state.settingCard);

  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    contactNumber,
    country,
    city,
    address,
    postalCode,
  } = user.extra;

  const { phonePrefix, phoneNumber } = contactNumber || {};

  return (
    <>
      <UserDetails />

      {/* Personal Details */}
      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Personal Details</h5>
          <button
            className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity group"
            onClick={() => {
              navigate(editProfile);
              setSelectedSetting("account-settings");
            }}
          >
            <Icon
              name="MdOutlineEdit"
              size={25}
              className="group-hover:text-primary"
            />
          </button>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </div>
            <div>
              <p className="text-secondary">First Name</p>
              <p>{firstName || "Your first name"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4 ">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </div>
            <div>
              <p className="text-secondary">Last Name</p>
              <p>{lastName || "Your last name"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdCalendarMonth" />
            </div>
            <div>
              <p className="text-secondary">Birthday</p>
              <p>{dateOfBirth || "Your birthday"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsGenderAmbiguous" />
            </div>
            <div>
              <p className="text-secondary">Gender</p>
              <p>{gender || "Your gender"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdPhoneIphone" />
            </div>
            <div>
              <p className="text-secondary">Contact Number</p>
              <p>{`${phonePrefix} ${phoneNumber}` || "Your contact number"}</p>
            </div>
          </div>
        </div>

        <h5 className="text-xl font-semibold pt-6">Address Details</h5>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div className="flex w-full gap-4 ">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdOutlineLocationSearching" />
            </div>
            <div>
              <p className="text-secondary">Country</p>
              <p>{country || "Your country name"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TiLocationArrowOutline" />
            </div>
            <div>
              <p className="text-secondary">City</p>
              <p>{city || "Your city name"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="SlLocationPin" />
            </div>
            <div>
              <p className="text-secondary">Address Line</p>
              <p>{address || "Your address line"}</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsSignpostSplit" />
            </div>
            <div>
              <p className="text-secondary">Postal Code</p>
              <p>{postalCode || "Your postal code"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Shipping Details</h5>
          <button
            className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity group"
            onClick={() => {
              navigate(editProfile);
              setSelectedSetting("shipping-settings");
            }}
          >
            <Icon
              name="MdOutlineEdit"
              size={25}
              className="group-hover:text-primary"
            />
          </button>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaRegUser" />
            </div>
            <div>
              <p className="text-secondary">Full Name</p>
              <p>Your full name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdPhoneIphone" />
            </div>
            <div>
              <p className="text-secondary">Contact Number</p>
              <p>Your contact number</p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="MdOutlineLocationSearching" />
            </div>
            <div>
              <p className="text-secondary">Counrty</p>
              <p>Your country name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TiLocationArrowOutline" />
            </div>
            <div>
              <p className="text-secondary">State</p>
              <p>Your state name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="SlLocationPin" />
            </div>
            <div>
              <p className="text-secondary">City</p>
              <p>Your city name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="FaStreetView" />
            </div>
            <div>
              <p className="text-secondary">Street</p>
              <p>Your street name</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="TbBuildingWarehouse" />
            </div>
            <div>
              <p className="text-secondary">Build Number</p>
              <p>Your build number</p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BsSignpostSplit" />
            </div>
            <div>
              <p className="text-secondary">Zip Code</p>
              <p>Your zip code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
        <div className="flex flex_justify_between">
          <h5 className="text-xl font-semibold">Payment Details</h5>
          <button
            className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity group"
            onClick={() => {
              navigate(editProfile);
              setSelectedSetting("payment-settings");
            }}
          >
            <Icon
              name="MdOutlineEdit"
              size={25}
              className="group-hover:text-primary"
            />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex w-full gap-4 ">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="BiWorld" />
            </div>
            <div>
              <p className="text-secondary">Language</p>
              <p>Language type</p>
            </div>
          </div>
          <div className="flex w-full gap-4 ">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="RiTimeZoneLine" size={22} />
            </div>
            <div>
              <p className="text-secondary">Time Zones</p>
              <p>Your time zones</p>
            </div>
          </div>
          <div className="flex w-full gap-4 ">
            <div className="w-12 h-12 rounded-full flex_justify_center border border-gray-300">
              <Icon name="LiaCoinsSolid" size={22} />
            </div>
            <div>
              <p className="text-secondary">Currency</p>
              <p>Currency type</p>
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
