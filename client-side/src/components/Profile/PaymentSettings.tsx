import { FC } from "react";
import { Button, Tag } from "antd";
import creditCardType from "credit-card-type";
import { Icon } from "../../components";
import { useAppSelector } from "../../store";
import { firstLetterToUpperCase } from "../../utils";

export const PaymentSettings: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  let savedCards = Object.values(user.extra.creditCards || {});
  savedCards = [
    { cardNr: "5127 8809 9999 9990", isDefault: true },
    { cardNr: "4035 5010 0000 0008", isDefault: false },
  ];

  return (
    <div className="flex flex-col gap-2 text-onNeutralBg">
      {savedCards.length > 0 && (
        <>
          {savedCards.map((card: any) => {
            const cardType = firstLetterToUpperCase(
              creditCardType(card.cardNr)[0]?.type,
            );

            return (
              <div
                key={card.cardNr}
                className="flex_justify_between p-4 bg-main rounded"
              >
                <div className="flex_justify_start gap-4">
                  <Icon name="FaCreditCard" size={30} />
                  <p>
                    {cardType} - {card.cardNr.slice(-4)}
                  </p>
                  {card.isDefault && (
                    <Tag variant="filled" color="blue">
                      Default
                    </Tag>
                  )}
                </div>
                <Button
                  variant="text"
                  color="default"
                  icon={<Icon name="BsThreeDots" />}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
