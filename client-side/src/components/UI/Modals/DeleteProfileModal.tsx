import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SmallModal } from "./ModalContent";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useStore } from "../../../hooks";
import { useAppSelector } from "../../../store";
import { DeleteProfileValues } from "../../../types";
import { useProfileService } from "../../../services";
import { ErrorFormMessage } from "../../../components";
import { deleteProfileValidation, classNames } from "../../../utils";

export const DeleteProfileModal: FC = () => {
  const { deleteProfile } = useProfileService();
  const { modals, setModalOpen } = useStore();

  const { user } = useAppSelector((state) => state.user);

  const {
    register: form,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(deleteProfileValidation),
  });

  const handleModalOpen = () => {
    setModalOpen("deleteProfileModal", false);
  };

  const handleModalClose = () => {
    reset();
    setModalOpen("deleteProfileModal", false);
  };

  const handleOnSubmit = async (values: DeleteProfileValues) => {
    try {
      await deleteProfile(values);
      handleModalOpen();
    } catch (error) {
      console.error(`delete_profile_modal_error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <SmallModal
      open={modals["deleteProfileModal"]}
      closable={false}
      width={600}
    >
      <div className="modal-header flex_justify_between w-full text-xl text-onNeutralBg font-semibold">
        Delete Account
        <button
          type="button"
          className="p-2 rounded-full hover:bg-primary-opacity group"
          onClick={handleModalClose}
        >
          <Icon name="MdClear" className="group-hover:text-primary" />
        </button>
      </div>
      <div className="modal-body w-full mt-6 flex flex-col gap-6 text-onNeutralBg">
        <div className="warning-part w-full flex items-center bg-yellow-50 border border-solid border-1 border-yellow-500 rounded-md p-5">
          <p className="flex gap-2 text-sm font-normal text-secondary">
            <Icon
              name="FiAlertTriangle"
              className="text-yellow-500"
              size={20}
            />
            Unexpected bad things will happen if you don't read this!
          </p>
        </div>
        <p className="text-sm text-secondary">
          This will permanently delete the{" "}
          <span className="font-semibold">{user?.username} </span> account.
          Please note this will also remove all of your information from our
          system, so we will not be able to do any recovery.
        </p>
        <p className="text-secondary">
          Your profile will be deleted in 14 days. If you change your mind,
          please contact support.
        </p>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <label className="block text-secondary text-sm">
            Type <span className="font-semibold italic">delete</span> in the
            field below to confirm.
          </label>
          <div>
            <input
              {...form("confirmDelete")}
              name="confirmDelete"
              className={classNames(
                "w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0 hover:border-primary",
                errors["confirmDelete"] &&
                  "border border-red-500 hover:border-red-500"
              )}
              type="text"
              placeholder="Type delete to confirm"
            />
            <ErrorFormMessage
              errorMessage={errors?.["confirmDelete"]?.message}
            />
          </div>
          <div className="flex_justify_end gap-2">
            <Button
              type="button"
              label="Keep Account"
              variant="outlined"
              className="rounded-full"
              onClick={handleModalClose}
            />
            <Button
              type="button"
              label="Delete Account"
              variant="delete"
              className="rounded-full"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </SmallModal>
  );
};
