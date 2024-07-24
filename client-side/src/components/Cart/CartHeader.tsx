import { FunctionComponent, useState } from "react";
import { Badge } from "antd";
import { Button, Icon } from "../UI";
import { GameParams } from "../../types";

interface CartHeaderProps {
  cart: GameParams[];
  handleBackCartSwitch: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  isSelectAll: boolean;
  setIsSelectAll: (isSelectAll: boolean) => void;
}

export const CartHeader: FunctionComponent<CartHeaderProps> = (props) => {
  const {
    cart,
    handleBackCartSwitch,
    isEditing,
    setIsEditing,
    setIsSelectAll,
  } = props;

  const [show, setShow] = useState(true);

  return (
    <div className="switch_header flex_justify_between p-4 h-navbar cursor-pointer">
      <div className="flex items-center gap-4">
        <div onClick={handleBackCartSwitch}>
          <Icon name="GoArrowLeft" className="hover:text-primary" />
        </div>
        <h5 className="text-base font-semibold">Games</h5>
        <Badge count={show ? cart.length : 0} showZero color="var(--primary)" />
      </div>
      <div className="flex items-center gap-2">
        {!isEditing && (
          <div className="group">
            <Button
              variant="none"
              label="Edit"
              labelIcon="AiOutlineEdit"
              className="w-full h-8 flex_justify_center text-onNeutralBg group-hover:text-primary"
              iconClassName="text-onNeutralBg group-hover:text-primary"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
        {isEditing && (
          <div className="flex">
            <Button
              variant="none"
              className="w-8 h-8 flex_justify_center"
              iconClassName="hover:text-primary"
              labelIcon="BiSelectMultiple"
              tooltipTitle="Select all"
              onClick={() => setIsSelectAll(true)}
            />
            <Button
              variant="none"
              className="w-8 h-8 flex_justify_center"
              iconClassName="hover:text-primary"
              labelIcon="AiOutlineDelete"
              tooltipTitle="Delete"
            />
            <Button
              variant="none"
              labelIcon="MdOutlineCancel"
              className="w-8 h-8 flex_justify_center"
              iconClassName="hover:text-primary"
              onClick={() => {
                setIsEditing(false);
                setIsSelectAll(false);
              }}
              tooltipTitle="Cancel"
            />
          </div>
        )}
      </div>
    </div>
  );
};
