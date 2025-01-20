import { Select, Popover, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import creditCardType from "credit-card-type";
import { Icon, Image, Button } from "../../UI";
import { removeSelectedCard, addNewCard } from "../../../store";
import { cvvNumberImg } from "../../../assets";
import {
  cardMonthList,
  cardYearList,
  cardImgList,
  cardTypList,
} from "../../../data";
import { classNames } from "../../../utils";

interface PaymentSettingsProps {}

interface NewCardContentProps {
  cardId: number;
}

const cvvContent = (
  <div className="w-full flex flex-col text-onNeutralBg p-2">
    <p className="text-base font-bold">Add cvv card</p>
    <div className="w-full flex_justify_center flex-col">
      <div className="w-full flex flex-row">
        <Image
          imgUrl={cvvNumberImg}
          height={200}
          width={200}
          effect="opacity"
        />
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
        <Image
          imgUrl={cvvNumberImg}
          height={200}
          width={200}
          effect="opacity"
        />
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

export const PaymentSettings: FC<PaymentSettingsProps> = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<number | undefined>(undefined);

  const onChangePaymentMethods = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleMenuClick = async (data: any) => {
    const cardType = creditCardType(data.cardNumber);

    dispatch(
      addNewCard({
        ...data,
        cardType: cardType[0]?.type,
      })
    );

    reset();
  };

  const {
    register: form,
    handleSubmit,
    control,
    formState: { /*errors,*/ isValid },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  return (
    <div className="w-full text-onNeutralBg">
      <div className="flex flex-col bg-card p-8 rounded gap-6">
        <h5 className="text-lg font-semibold">
          {/* Card Details */} Your payment method
        </h5>
        <p className="text-secondary">
          By saving your payment information, this payment method will be set as
          the default for all purchases made using your Epic Games Account on PC
          and mobile, including purchases on the GrooveIT Games Store.
        </p>
        <div className="flex flex-col gap-2">
          <button
            className={classNames(
              "bg-primary-opacity rounded p-4",
              value === 1 && "flex flex-col gap-4 border border-primary"
            )}
            onClick={() => setValue(1)}
          >
            <div className="flex_justify_start gap-4">
              <button
                type="button"
                className={classNames(
                  "flex_justify_center w-6 h-6 rounded-full",
                  value === 1
                    ? "bg-primary border border-primary"
                    : "border border-onNeutralBg"
                )}
              >
                {value === 1 && (
                  <Icon name="FaCheck" className="text-white" size={15} />
                )}
              </button>
              <Icon name="FaCreditCard" size={30} />
              <p>Credit Card</p>
            </div>

            {value === 1 && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex_justify_start gap-4">
                  {cardImgList.map((cardImg) => (
                    <Image
                      key={cardImg.id}
                      imgUrl={cardImg.img}
                      name={cardImg.name}
                      width={cardImg.width}
                      effect="blur"
                    />
                  ))}
                </div>
                <form
                  className="w-full flex flex-col gap-6"
                  onSubmit={handleSubmit(handleMenuClick)}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <input
                        {...form("cardNumber")}
                        name="cardNumber"
                        className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-onNeutralBg rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                        type="text"
                        placeholder="Card number"
                        autoComplete="cardNumber"
                      />
                    </div>
                    <div className="w-full">
                      <input
                        {...form("cardName")}
                        name="cardName"
                        className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                        type="text"
                        placeholder="Name on Card"
                        autoComplete="cardName"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <div className="flex_justify_between gap-2">
                        <Controller
                          name="cardMonth"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full h-12 text-sm"
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
                              className="w-full h-12 text-sm"
                              placeholder="YYYY"
                              options={cardYearList}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          {...form("cardCvvNumber")}
                          name="cardCvvNumber"
                          className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
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
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      type="button"
                      label="Cancel"
                      variant="outlined"
                      className="h-10"
                    />
                    <Button
                      type="submit"
                      label="Add new card"
                      variant="contained"
                      className="h-10"
                      disabled={isValid}
                    />
                  </div>
                </form>
              </div>
            )}
          </button>
          <button
            onClick={() => setValue(2)}
            className={classNames(
              "bg-primary-opacity rounded p-4",
              value === 2 && "flex flex-col gap-4 border border-primary"
            )}
          >
            <div className="flex_justify_start gap-4">
              <button
                type="button"
                className={classNames(
                  "flex_justify_center w-6 h-6 rounded-full",
                  value === 2
                    ? "bg-primary border border-primary"
                    : "border border-onNeutralBg"
                )}
              >
                {value === 2 && (
                  <Icon name="FaCheck" className="text-white" size={15} />
                )}
              </button>
              <Icon name="FaCcPaypal" size={30} />
              <p>PayPal</p>
            </div>

            {value === 2 && <p>TEST 2</p>}
          </button>
        </div>

        {/* <div className="flex_justify_start gap-4">
          {cardImgList.map((cardImg) => (
            <Image
              key={cardImg.id}
              imgUrl={cardImg.img}
              name={cardImg.name}
              width={cardImg.width}
              effect="blur"
            />
          ))}
        </div>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={handleSubmit(handleMenuClick)}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
            <div className="w-full">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Type
              </label>
              <Controller
                name="typeOfCard"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full h-12 text-sm"
                    placeholder="Card Type"
                    options={cardTypList}
                  />
                )}
              />
            </div>
            <div className="w-full"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
            <div className="w-full">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Number
              </label>
              <input
                {...form("cardNumber")}
                name="cardNumber"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                type="text"
                placeholder="Card number"
                autoComplete="cardNumber"
              />
            </div>
            <div className="w-full">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Card Name
              </label>
              <input
                {...form("cardName")}
                name="cardName"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary"
                type="text"
                placeholder="Name on Card"
                autoComplete="cardName"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
            <div className="w-full">
              <label className="block text-secondary text-xs font-semibold mb-2">
                Valid Thru
              </label>
              <div className="flex_justify_between gap-2">
                <Controller
                  name="cardMonth"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full h-12 text-sm"
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
                      className="w-full h-12 text-sm"
                      placeholder="YYYY"
                      options={cardYearList}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-secondary text-xs font-semibold mb-2">
                CVV Number
              </label>
              <div className="relative">
                <input
                  {...form("cardCvvNumber")}
                  name="cardCvvNumber"
                  className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
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

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              label="Cancel"
              variant="outlined"
              className="h-10"
            />
            <Button
              type="submit"
              label="Add new card"
              variant="contained"
              className="h-10"
              disabled={isValid}
            />
          </div>
        </form> */}
      </div>
    </div>
  );
};
