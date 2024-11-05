import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SmallModal } from "./ModalContent";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useAppSelector } from "../../../store";
import { ErrorFormMessage } from "../../Common";
import { useProfileService } from "../../../services";
import {
  useAppModal,
  deleteProfileValidation,
  classNames,
} from "../../../utils";
import { DeleteProfileProps, DeleteProfileValues } from "../../../types";

export const DeleteProfileModal: FC<DeleteProfileProps> = () => {
  const { user } = useAppSelector((state) => state.user);
  const { deleteProfile } = useProfileService();
  const { modals, setModalOpen } = useAppModal();

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
      console.error(`Failed to change password! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["deleteProfileModal"]}
      onCancel={handleModalClose}
      closable={true}
      width={600}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        Delete Account
      </div>
      <div className="modal-body mt-5">
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
        <p className="mt-4 text-sm text-secondary">
          This will permanently delete the{" "}
          <span className="font-semibold">{user?.username} </span> account.
          Please note this will also remove all of your information from our
          system, so we will not be able to do any recovery.
        </p>
        <p className="mt-5 text-secondary">
          Your profile will be deleted in 14 days. If you change your mind,
          please contact support.
        </p>
        <form className="w-full mt-5" onSubmit={handleSubmit(handleOnSubmit)}>
          <label className="block text-secondary text-sm mb-4">
            Type <span className="font-semibold italic">delete</span> in the
            field below to confirm.
          </label>
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
          <ErrorFormMessage errorMessage={errors?.["confirmDelete"]?.message} />
          <div className="flex items-center justify-end w-full mt-7">
            <Button
              type="button"
              label="Keep Account"
              variant="outlined"
              className="mr-4"
              onClick={handleModalClose}
            />
            <Button
              type="button"
              label="Delete Account"
              variant="delete"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </SmallModal>
  );
};
