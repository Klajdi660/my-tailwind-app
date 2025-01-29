import { Popover } from "antd";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import creditCardType from "credit-card-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardImgList } from "../../data";
import { useAppSelector } from "../../store";
import { useProfileService } from "../../services";
import {
  classNames,
  creditCardValidation,
  firstLetterToUpperCase,
} from "../../utils";
import { ErrorFormMessage, Button, Image, Icon } from "../../components";

const cvvContent = (
  <div className="flex flex-col text-onNeutralBg p-2 gap-4">
    <p>
      <p className="font-semibold">All Cards</p>
      CVV is the 3 digit number on the back of your card
    </p>
    <p>
      <p className="font-semibold">American Express Card</p>
      CVV is the 4 digit number in the front side of the card, right above the
      card number
    </p>
  </div>
);

export const PaymentSettings: FC = () => {
  const { addNewCreditCard } = useProfileService();

  const [value, setValue] = useState<number>();
  const [defaultCreditCard, setDefaultCreditCard] = useState<string | null>(
    null
  );

  const { user } = useAppSelector((state) => state.user);

  const savedCards = Object.values(user.extra.creditCards || {});

  const openPayPalPopup = () => {
    const popup = window.open(
      "https://www.paypal.com/signin",
      "PayPal Login",
      "width=600,height=700,scrollbars=yes,resizable=yes"
    );

    const popupInterval = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(popupInterval);
        alert("PayPal login process completed or window closed.");
      }
    }, 500);
  };

  const handleCreditCard = async (values: object) => {
    try {
      await addNewCreditCard(values);
    } catch (error) {
      console.error(`Failed to add new credit card! ${error}`);
    }
  };

  const {
    register: form,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(creditCardValidation),
  });

  return (
    <div className="w-full flex flex-col bg-card p-8 gap-2 rounded text-onNeutralBg">
      <div>
        <h5 className="text-lg font-semibold">Your payment method</h5>
        <p className="text-secondary">
          By saving your payment information, this payment method will be set as
          the default for all purchases made using your Epic Games Account on PC
          and mobile, including purchases on the GrooveIT Games Store.
        </p>
      </div>
      <div>
        {savedCards.length > 0 && (
          <>
            {savedCards.map((card: any) => {
              const cardType = firstLetterToUpperCase(
                creditCardType(card.cardNr)[0]?.type
              );

              return (
                <div key={card.cardNr} className="flex_justify_between py-2">
                  <div className="flex_justify_start gap-2">
                    <button
                      className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center hover:bg-primary-opacity group"
                      onClick={() => setDefaultCreditCard(card.cardNr)}
                    >
                      <Icon
                        name="FaCheck"
                        size={16}
                        className={classNames(
                          "group-hover:text-primary",
                          defaultCreditCard === card.cardNr && "text-green-600"
                        )}
                      />
                    </button>
                    <div className="flex_justify_center gap-4">
                      <Icon name="FaCreditCard" size={30} />
                      <p>
                        {cardType} - {card.cardNr.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex_justify_end gap-2">
                    <button className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center hover:bg-primary-opacity group">
                      <Icon
                        name="AiOutlineEdit"
                        size={24}
                        className="group-hover:text-primary"
                      />
                    </button>
                    <button className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center hover:bg-primary-opacity group">
                      <Icon
                        name="RiDeleteBinLine"
                        className="group-hover:text-primary"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              value === 1
                ? "flex flex-col border border-primary rounded"
                : "py-2 hover:bg-primary-opacity cursor-pointer"
            )}
            onClick={() => setValue(1)}
          >
            <div className="flex_justify_start gap-2 group">
              <button className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center hover:bg-primary-opacity group">
                <Icon
                  name={value === 1 ? "FaDotCircle" : "FaRegCircle"}
                  className={classNames(value === 1 && "text-primary")}
                />
              </button>
              <div className="flex_justify_center gap-4">
                <Icon
                  name="FaCreditCard"
                  size={30}
                  className={classNames(
                    value !== 1 && "group-hover:text-primary"
                  )}
                />
                <p
                  className={classNames(
                    value !== 1 && "group-hover:text-primary"
                  )}
                >
                  Credit or Debit Card
                </p>
              </div>
            </div>
            {value === 1 && (
              <div className="w-full flex flex-col gap-2 p-4">
                <div className="flex_justify_start gap-1">
                  {cardImgList.map((cardImg) => (
                    <Image
                      key={cardImg.id}
                      imgUrl={cardImg.img}
                      name={cardImg.name}
                      styles={`w-${cardImg.width} h-${cardImg.height}`}
                    />
                  ))}
                </div>
                <form
                  className="w-full flex flex-col gap-6"
                  onSubmit={
                    // handleSubmit(handleMenuClick)
                    handleSubmit(handleCreditCard)
                  }
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <input
                        {...form("cardName")}
                        name="cardName"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardName"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Name on Card"
                        autoComplete="cardName"
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardName"]?.message}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        {...form("cardNr")}
                        name="cardNr"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardNr"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Card number"
                        autoComplete="cardNr"
                        onInput={(e) => {
                          let value = e.currentTarget.value.replace(/\D/g, "");
                          value = value.replace(/(\d{4})(?=\d)/g, "$1-");
                          e.currentTarget.value = value;
                        }}
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardNr"]?.message}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <input
                        {...form("cardExp")}
                        name="cardExp"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardExp"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Expiration"
                        autoComplete="cardExp"
                        onInput={(e) => {
                          let value = e.currentTarget.value.replace(/\D/g, "");
                          if (value.length > 2) {
                            value =
                              value.substring(0, 2) +
                              "/" +
                              value.substring(2, 4);
                          }

                          e.currentTarget.value = value;
                        }}
                        onFocus={(e) => {
                          e.currentTarget.placeholder = "MM/YY";
                        }}
                        // onBlur={(e) => {
                        //   e.currentTarget.placeholder = "Expiration";
                        // }}
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardExp"]?.message}
                      />
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          {...form("cardCvvNr")}
                          name="cardCvvNr"
                          className={classNames(
                            "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                            errors["cardCvvNr"]
                              ? "border border-red-500 hover:border-red-500"
                              : "border border-divider focus-within:border-primary hover:border-primary"
                          )}
                          type="text"
                          placeholder="CVV"
                          autoComplete="cardCvvNr"
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/\D/g, "");
                          }}
                        />
                        <Popover
                          placement="topLeft"
                          content={cvvContent}
                          arrow={false}
                        >
                          <button
                            type="button"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-secondary"
                          >
                            <Icon name="AiOutlineExclamationCircle" size={16} />
                          </button>
                        </Popover>
                      </div>
                      <ErrorFormMessage
                        errorMessage={errors["cardCvvNr"]?.message}
                      />
                    </div>
                  </div>
                  <div className="flex_justify_end">
                    <Button
                      type="submit"
                      label="Save billing account"
                      variant="contained"
                      className="h-10"
                      disabled={!isValid}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* <div
            className={classNames(
              "rounded p-4 cursor-pointer group",
              value === 1
                ? "flex flex-col gap-4 border border-primary"
                : "hover:bg-primary-opacity"
            )}
            onClick={() => setValue(1)}
          >
            <div className="flex_justify_start gap-4">
              <button
                type="button"
                className={classNames(
                  "flex_justify_center w-5 h-5 rounded-full",
                  value === 1
                    ? "bg-primary border border-primary"
                    : "border border-onNeutralBg"
                )}
              >
                {value === 1 && (
                  <Icon name="FaCheck" className="text-white" size={15} />
                )}
              </button>
              <Icon
                name="FaCreditCard"
                size={30}
                className={classNames(
                  value !== 1 && "group-hover:text-primary"
                )}
              />
              <p
                className={classNames(
                  value !== 1 && "group-hover:text-primary"
                )}
              >
                Credit or Debit Card
              </p>
            </div>
            {value === 1 && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex_justify_start gap-1">
                  {cardImgList.map((cardImg) => (
                    <Image
                      key={cardImg.id}
                      imgUrl={cardImg.img}
                      name={cardImg.name}
                      styles={`w-${cardImg.width} h-${cardImg.height}`}
                    />
                  ))}
                </div>
                <form
                  className="w-full flex flex-col gap-6"
                  onSubmit={
                    // handleSubmit(handleMenuClick)
                    handleSubmit(handleCreditCard)
                  }
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <input
                        {...form("cardName")}
                        name="cardName"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardName"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Name on Card"
                        autoComplete="cardName"
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardName"]?.message}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        {...form("cardNr")}
                        name="cardNr"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardNr"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Card number"
                        autoComplete="cardNr"
                        onInput={(e) => {
                          let value = e.currentTarget.value.replace(/\D/g, "");
                          value = value.replace(/(\d{4})(?=\d)/g, "$1-");
                          e.currentTarget.value = value;
                        }}
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardNr"]?.message}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    <div className="w-full">
                      <input
                        {...form("cardExp")}
                        name="cardExp"
                        className={classNames(
                          "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                          errors["cardExp"]
                            ? "border border-red-500 hover:border-red-500"
                            : "border border-divider focus-within:border-primary hover:border-primary"
                        )}
                        type="text"
                        placeholder="Expiration"
                        autoComplete="cardExp"
                        onInput={(e) => {
                          let value = e.currentTarget.value.replace(/\D/g, "");
                          if (value.length > 2) {
                            value =
                              value.substring(0, 2) +
                              "/" +
                              value.substring(2, 4);
                          }

                          e.currentTarget.value = value;
                        }}
                        onFocus={(e) => {
                          e.currentTarget.placeholder = "MM/YY";
                        }}
                        // onBlur={(e) => {
                        //   e.currentTarget.placeholder = "Expiration";
                        // }}
                      />
                      <ErrorFormMessage
                        errorMessage={errors["cardExp"]?.message}
                      />
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          {...form("cardCvvNr")}
                          name="cardCvvNr"
                          className={classNames(
                            "w-full h-12 bg-transparent text-sm text-onNeutralBg rounded px-2 outline-0",
                            errors["cardCvvNr"]
                              ? "border border-red-500 hover:border-red-500"
                              : "border border-divider focus-within:border-primary hover:border-primary"
                          )}
                          type="text"
                          placeholder="CVV"
                          autoComplete="cardCvvNr"
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/\D/g, "");
                          }}
                        />
                        <Popover
                          placement="topLeft"
                          content={cvvContent}
                          arrow={false}
                        >
                          <button
                            type="button"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-secondary"
                          >
                            <Icon name="AiOutlineExclamationCircle" size={16} />
                          </button>
                        </Popover>
                      </div>
                      <ErrorFormMessage
                        errorMessage={errors["cardCvvNr"]?.message}
                      />
                    </div>
                  </div>
                  <div className="flex_justify_end">
                    <Button
                      type="submit"
                      label="Save billing account"
                      variant="contained"
                      className="h-10"
                      disabled={!isValid}
                    />
                  </div>
                </form>
              </div>
            )}
          </div> */}
          {/* <div
            onClick={() => {
              setValue(2);
              reset();
            }}
            className={classNames(
              "rounded p-4 cursor-pointer group",
              value === 2
                ? "flex flex-col gap-4 border border-primary"
                : "hover:bg-primary-opacity"
            )}
          >
            <div className="flex_justify_start gap-4">
              <button
                type="button"
                className={classNames(
                  "flex_justify_center w-5 h-5 rounded-full",
                  value === 2
                    ? "bg-primary border border-primary"
                    : "border border-onNeutralBg"
                )}
              >
                {value === 2 && (
                  <Icon name="FaCheck" className="text-white" size={15} />
                )}
              </button>
              <Icon
                name="FaCcPaypal"
                size={30}
                className={classNames(
                  value !== 2 && "group-hover:text-primary"
                )}
              />
              <p
                className={classNames(
                  value !== 2 && "group-hover:text-primary"
                )}
              >
                PayPal
              </p>
            </div>
            {value === 2 && (
              <div className="w-full">
                <p className="flex_justify_start text-secondary">
                  Please click the PayPal button below to login to your PayPal
                  account and save your payment method.
                </p>
                <div className="flex_justify_end">
                  <Button
                    type="submit"
                    label="PayPal"
                    variant="contained"
                    className="w-40 h-10"
                    onClick={openPayPalPopup}
                  />
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
