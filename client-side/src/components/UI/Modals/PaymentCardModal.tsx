import { Popover, Select } from "antd";
import { useDispatch } from "react-redux";
import { FC } from "react";
import creditCardType from "credit-card-type";
import { useForm, Controller } from "react-hook-form";
import { SmallModal } from "./ModalContent";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { Button } from "../Button";
import { addNewCard } from "../../../store";
import { useAppModal } from "../../../utils";
import { PaymentCardProps } from "../../../types";
import {
  cardMonthList,
  cardYearList,
  cardImgList,
  cardTypList,
} from "../../../data";
import { cvvNumberImg } from "../../../assets";

const cvvContent = (
  <div className="w-full flex flex-col text-onNeutralBg">
    <p className="text-base font-bold">Add cvv card</p>
    <div className="w-full flex_justify_center flex-col">
      <div className="w-full flex flex-row">
        <Image imgUrl={cvvNumberImg} height={200} width={200} effect="none" />
        <div className="w-[250px]">
          <p className="flex items-center font-semibold">
            <Icon name="GoDotFill" />
            American Express
          </p>
          <p className="ml-5 text-justify">
            CVV is the 4 digit number in the front side of the card, right above
            the card number
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <Image imgUrl={cvvNumberImg} height={200} width={200} effect="none" />
        <div className="w-[250px]">
          <p className="flex items-center font-semibold">
            <Icon name="GoDotFill" />
            Other Cards
          </p>
          <p className="ml-5 text-justify">
            CVV is the 3 digit number on the back of your card
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const PaymentCardModal: FC<PaymentCardProps> = () => {
  const { modals, setModalOpen } = useAppModal();

  const dispatch = useDispatch();

  const handleMenuClick = async (data: any) => {
    const cardType = creditCardType(data.cardNumber);

    dispatch(
      addNewCard({
        ...data,
        cardType: cardType[0]?.type,
      })
    );
    handleModalClose();
  };

  const {
    register: form,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const handleModalClose = () => {
    reset();
    setModalOpen("paymentCardModal", false);
  };

  return (
    <SmallModal
      open={modals["paymentCardModal"]}
      onCancel={handleModalClose}
      closable={true}
      // width={800}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        Add new card
      </div>
      <div className="modal-body w-full mt-4 flex flex-col gap-4 text-onNeutralBg">
        <div className="w-full flex items-center gap-4 bg-primary-opacity rounded-lg p-2">
          <p className="text-base font-bold">Add new card</p>
          {cardImgList.map((cardImg) => (
            <Image
              key={cardImg.id}
              imgUrl={cardImg.img}
              name={cardImg.name}
              width={cardImg.width}
              effect="none"
            />
          ))}
        </div>
        <form
          className="w-full flex flex-col mt-4"
          onSubmit={handleSubmit(handleMenuClick)}
        >
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-[48%] pb-5">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Type
              </label>
              <Controller
                name="typeOfCard"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full h-10 text-sm"
                    placeholder="Card Type"
                    options={cardTypList}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-[48%] pb-5">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Number
              </label>
              <input
                {...form("cardNumber")}
                name="cardNumber"
                className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Card number"
                autoComplete="cardNumber"
              />
            </div>
            <div className="w-full md:w-[48%] pb-5">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Name
              </label>
              <input
                {...form("cardName")}
                name="cardName"
                className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Name on Card"
                autoComplete="cardName"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-[48%] pb-5">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Valid Thru
              </label>
              <div className="flex_justify_between">
                <Controller
                  name="cardMonth"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-[48%] h-10 text-sm"
                      placeholder="MM"
                      options={cardMonthList}
                    />
                  )}
                />
                /
                <Controller
                  name="cardYear"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-[48%] h-10 text-sm"
                      placeholder="YYYY"
                      options={cardYearList}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full md:w-[48%] pb-5">
              <label className="block text-secondary text-xs font-semibold mb-2">
                CVV Number
              </label>
              <div className="relative">
                <input
                  {...form("cardCvvNumber")}
                  name="cardCvvNumber"
                  className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                  type="text"
                  placeholder="CVV"
                  autoComplete="cardCvvNumber"
                />
                <Popover placement="left" content={cvvContent}>
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-secondary"
                  >
                    <Icon name="AiOutlineExclamationCircle" size={16} />
                  </button>
                </Popover>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full mt-4">
            <Button
              type="button"
              label="Cancel"
              variant="outlined"
              className="mr-4"
              onClick={handleModalClose}
            />
            <Button
              type="submit"
              label="Add Card"
              variant="contained"
              // disabled={isValid}
            />
          </div>
        </form>
      </div>
    </SmallModal>
  );
};
