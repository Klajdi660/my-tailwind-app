import { FunctionComponent } from "react";
import { Badge } from "antd";
import { Button, Icon } from "../UI";
import { CartHeaderProps } from "../../types";
import { classNames } from "../../utils";

export const CartHeader: FunctionComponent<CartHeaderProps> = (props) => {
  const {
    cart,
    isEditing,
    isSelectAll,
    selections,
    selectAllGameHandler,
    cancelGameSelectedHandler,
    setIsEditing,
    backCartSwitchHandler,
    deleteSelectedGameHandler,
  } = props;

  const noGameSelection = selections.length === 0;

  return (
    <div className="switch_header flex_justify_between px-2 py-4 h-navbar cursor-pointer">
      <div className="flex items-center gap-4">
        <Icon
          name="GoArrowLeft"
          className="hover:text-primary"
          onClick={backCartSwitchHandler}
        />
        <h5 className="text-onNeutralBg text-base font-semibold">Games</h5>
        <Badge count={cart.length} showZero color="var(--primary)" />
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
              iconClassName={`${isSelectAll && "text-primary"} hover:text-primary`}
              labelIcon="BiSelectMultiple"
              tooltipTitle="Select all"
              onClick={selectAllGameHandler}
            />
            <Button
              variant="none"
              className="w-8 h-8 flex_justify_center"
              iconClassName={classNames(
                !noGameSelection && "hover:text-primary"
              )}
              labelIcon="AiOutlineDelete"
              tooltipTitle="Delete"
              disabled={noGameSelection}
              onClick={deleteSelectedGameHandler}
            />
            <Button
              variant="none"
              labelIcon="MdOutlineCancel"
              className="w-8 h-8 flex_justify_center"
              iconClassName="hover:text-primary"
              onClick={cancelGameSelectedHandler}
              tooltipTitle="Cancel"
            />
          </div>
        )}
      </div>
    </div>
  );
};
