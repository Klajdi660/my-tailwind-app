import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Image } from "../../UI";
import { paths, cardImg } from "../../../data";
import {
  maskCardNumber,
  firstLetterToUpperCase,
  classNames,
} from "../../../utils";
import { useAppSelector, removeSelectedCard } from "../../../store";
import { noCardTypeImg } from "../../../assets";

export const CardDetails: FC = () => {
  const { editProfile } = paths;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openEditCard, setOpenEditCard] = useState<boolean>(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const { cardItems } = useAppSelector((state) => state.settingCard);

  const handleRemoveCard = (cardId: number) => {
    dispatch(removeSelectedCard(cardId));
  };

  return (
    <div className="flex flex-col gap-6 bg-card rounded p-8 text-onNeutralBg">
      <div className="flex flex_justify_between">
        <h5 className="text-xl font-semibold">Payment Details</h5>
        <button
          className="flex flex_justify_center w-10 h-10 rounded-full cursor-pointer hover:bg-primary-opacity group"
          onClick={() => navigate(`${editProfile}/general`)}
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
              cardCvvNr,
              cardMonth,
              cardYear,
              cardName,
              cardNr,
              cardType,
              typeOfCard,
              id,
            } = cardItem;

            return (
              //   <div
              //     key={id}
              //     className={classNames(
              //       "flex_justify_between p-4 bg-primary-opacity rounded text-onNeutralBg"
              //     )}
              //   >
              //     <div className="flex_justify_center gap-4">
              //       <Image
              //         imgUrl={
              //           cardImg[cardType] ? cardImg[cardType] : noCardTypeImg
              //         }
              //         name="bank_img"
              //         styles="w-14"
              //       />
              //       <p className="">
              //         {firstLetterToUpperCase(cardType)} - {cardNr.slice(0, 4)}
              //       </p>
              //     </div>
              //     <div className="flex_justify_end gap-4">
              //       <button
              //         className="group"
              //         onClick={() =>
              //           setEditingCardId(editingCardId === id ? null : id)
              //         }
              //       >
              //         <Icon
              //           name="FaRegEdit"
              //           className="group-hover:text-primary"
              //         />
              //       </button>
              //       <button
              //         className="group"
              //         onClick={() => handleRemoveCard(id)}
              //       >
              //         <Icon
              //           name="MdDeleteOutline"
              //           className="group-hover:text-primary"
              //         />
              //       </button>
              //     </div>
              //     {editingCardId === id && (
              //       <p className="flex flex-col text-lg">
              //         {maskCardNumber(cardNr)}
              //       </p>
              //     )}
              //   </div>
              <div
                key={id}
                className={classNames(
                  "flex_justify_between p-4 bg-primary-opacity rounded text-onNeutralBg"
                )}
              >
                <div className="flex_justify_center gap-4">
                  <Image
                    imgUrl={
                      cardImg[cardType] ? cardImg[cardType] : noCardTypeImg
                    }
                    name="bank_img"
                    styles="w-14"
                  />
                  <p className="">
                    {firstLetterToUpperCase(cardType)} - {cardNr.slice(0, 4)}
                  </p>
                </div>
                <div className="flex_justify_end gap-4">
                  <button
                    className="group"
                    onClick={() =>
                      setEditingCardId(editingCardId === id ? null : id)
                    }
                  >
                    <Icon
                      name="FaRegEdit"
                      className="group-hover:text-primary"
                    />
                  </button>
                  <button
                    className="group"
                    onClick={() => handleRemoveCard(id)}
                  >
                    <Icon
                      name="MdDeleteOutline"
                      className="group-hover:text-primary"
                    />
                  </button>
                </div>
                {editingCardId === id && (
                  <div className="mt-4">
                    <p className="text-lg">{maskCardNumber(cardNr)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
