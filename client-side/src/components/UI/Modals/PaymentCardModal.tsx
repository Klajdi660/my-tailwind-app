import { Popover, Select } from "antd";
import { FunctionComponent } from "react";
import creditCardType from "credit-card-type";
import { useForm, Controller } from "react-hook-form";
import { SmallModal } from "./ModalContent";
import { Image } from "../Image";
import { Button } from "../Button";
import { useAppModal } from "../../../utils";
import { PaymentCardProps } from "../../../types";
import { masterCardImg, visaImg, maestroCardImg } from "../../../assets";
import { cardMonthList, cardYearList } from "../../../data";
import { addNewCard } from "../../../store";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";

const cvvContent = (
  <div>
    <div className="text-red-500">TEST</div>
  </div>
);

export const PaymentCardModal: FunctionComponent<PaymentCardProps> = () => {
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
      width={800}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        Add new card
      </div>
      <div className="modal-body w-full mt-4 flex flex-col gap-4 text-onNeutralBg">
        <div className="w-full flex items-center gap-4 bg-primary-opacity rounded-lg p-2">
          <p className="text-base font-bold">Add new card</p>
          <Image imgUrl={visaImg} name="visa_img" width={50} />
          <Image imgUrl={masterCardImg} name="mastercard_img" width={40} />
          <Image imgUrl={maestroCardImg} name="maestrocard_img" width={40} />
        </div>
        <form
          className="w-full flex flex-col mt-4"
          onSubmit={handleSubmit(handleMenuClick)}
        >
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
                  <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-secondary">
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
