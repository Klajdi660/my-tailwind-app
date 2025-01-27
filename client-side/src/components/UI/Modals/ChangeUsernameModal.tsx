import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SmallModal } from "./ModalContent";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useStore } from "../../../hooks";
import { useAppSelector } from "../../../store";
import { ErrorFormMessage } from "../../Common";
import { useProfileService } from "../../../services";
import { classNames, editUsernameValidation } from "../../../utils";

export const ChangeUsernameModal: FC = () => {
  const { modals, setModalOpen } = useStore();
  const { changeUsername } = useProfileService();

  const { user } = useAppSelector((state) => state.user);

  const { username } = user || {};

  const handleModalClose = () => {
    reset();
    setModalOpen("changeUsernameModal", false);
  };

  const handleOnSubmit = async (values: any) => {
    try {
      await changeUsername(values);
      handleModalClose();
    } catch (error) {
      console.error(`Failed to change username! ${error}`);
    }
  };

  const {
    register: form,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editUsernameValidation),
  });

  return (
    <SmallModal
      open={modals["changeUsernameModal"]}
      closable={false}
      width={600}
    >
      <div className="modal-header flex_justify_between w-full text-xl text-onNeutralBg font-semibold">
        Change your username
        <button
          type="button"
          className="p-2 rounded hover:bg-primary-opacity group"
          onClick={handleModalClose}
        >
          <Icon
            name="MdClear"
            className="text-secondary group-hover:text-onNeutralBg"
          />
        </button>
      </div>
      <div className="modal-body w-full mt-6 flex flex-col gap-6 text-onNeutralBg">
        <p className="">
          If you changed your GrooveIT Games Username, you can’t change it again
          for 2 weeks after you confirm this change
        </p>
        <p className="flex gap-2 font-bold">
          Current Username:
          <span className="font-normal">{username}</span>
        </p>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div>
            <label className="block text-secondary text-xs font-semibold mb-2">
              New Username
            </label>
            <input
              {...form("username")}
              name="username"
              className={classNames(
                "w-full h-12 text-sm text-onNeutralBg rounded px-2 focus-within:border-primary outline-0 bg-transparent border border-divider hover:border-primary",
                errors["username"] &&
                  "border border-red-500 hover:border-red-500"
              )}
              type="text"
              placeholder="Enter new username"
              autoComplete="username"
            />
            <ErrorFormMessage errorMessage={errors?.["username"]?.message} />
          </div>
          <ul className="list-disc flex flex-col gap-4 p-8 bg-primary-opacity rounded">
            <li>
              Never use information that identifies you such as your real name,
              address, social media handle or phone number
            </li>
            <li>Display Names must be at least 3 characters long</li>
          </ul>
          <div className="flex items-center justify-end gap-4">
            <Button
              label="Cancel"
              variant="outlined"
              className="h-10"
              onClick={handleModalClose}
            />
            <Button
              type="submit"
              label="Confirm"
              variant="contained"
              className="h-10"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </SmallModal>
  );
};
