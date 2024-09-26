import { Select, Popover } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Icon, Image } from "../UI";
import { currencyList, cardImg } from "../../data";
import { useAppModal, maskCardNumber } from "../../utils";
import { removeSelectedCard, useAppSelector } from "../../store";
import { noCardTypeImg } from "../../assets";

interface PaymentSettingProps {}

interface NewCardContentProps {
  cardId: number;
}

export const NewCardContent: FC<NewCardContentProps> = (props) => {
  const { cardId } = props;

  const dispatch = useDispatch();

  const handleRemoveCard = () => {
    dispatch(removeSelectedCard(cardId));
  };

  return (
    <div
      className="flex_justify_center flex-row cursor-pointer gap-1 group"
      onClick={handleRemoveCard}
    >
      <Icon
        name="AiOutlineDelete"
        size={16}
        className="group-hover:text-primary"
      />
      <p className="text-secondary group-hover:text-primary">Remove card</p>
    </div>
  );
};

export const PaymentSetting: FC<PaymentSettingProps> = (props) => {
  const { setModalOpen } = useAppModal();

  const { cardItems } = useAppSelector((state) => state.settingCard);

  const currencyOptions = Object.keys(currencyList).map((curr) => ({
    label: currencyList[curr].label,
    value: curr,
  }));

  const handleModalClose = () => {
    setModalOpen("paymentCardModal", true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex_justify_between flex-row">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Currency
        </label>
        <Select
          // variant="borderless"
          className="h-10 w-52 text-sm"
          placeholder="Select currency"
          dropdownStyle={{ width: 200 }}
          options={currencyOptions}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <label
          htmlFor="provider"
          className="font-semibold text-sm text-secondary"
        >
          Cards
        </label>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {cardItems.map((cardItem: any) => {
            const { id, cardNumber, cardType } = cardItem;

            return (
              <div
                className="h-40 grid grid-cols-2 gap-4 p-4 bg-primary-opacity rounded-lg text-onNeutralBg"
                key={id}
              >
                <div className="flex items-start justify-start">
                  <p className="text-lg font-bold">
                    {maskCardNumber(cardNumber)}
                  </p>
                </div>
                <div className="flex items-start justify-end mt-1">
                  <Image
                    imgUrl={
                      cardImg[cardType] ? cardImg[cardType] : noCardTypeImg
                    }
                    name="bank_img"
                    width={50}
                  />
                </div>
                <div></div>
                <div className="flex items-end justify-end cursor-pointer">
                  <Popover
                    arrow={false}
                    content={<NewCardContent cardId={id} />}
                  >
                    <button>
                      <Icon name="BsThreeDots" className="hover:text-primary" />
                    </button>
                  </Popover>
                </div>
              </div>
            );
          })}
          <div
            className="h-40 flex_justify_center flex-row gap-2 bg-primary-opacity rounded-lg cursor-pointer group text-onNeutralBg"
            onClick={handleModalClose}
          >
            <Icon
              name="MdOutlineAddCircleOutline"
              size={20}
              className="group-hover:text-primary"
            />
            <p className="text-lg font-semibold group-hover:text-primary">
              Add new card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
