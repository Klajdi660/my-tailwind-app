import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../Common/ErrorMessage";
import { SmallModal } from "./Modal";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useAuth } from "../../../hooks";
import { DeleteProfileModalProps } from "../../../types";
import { useAppModal, deleteProfileValidation } from "../../../utils";

export const DeleteProfileModal: FunctionComponent<
  DeleteProfileModalProps
> = () => {
  const { user } = useAuth();
  const { modalOpen, setModalOpen } = useAppModal();

  const {
    register: form,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(deleteProfileValidation),
  });

  const onSubmit = (values: any) => {};

  return (
    <SmallModal
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      closable={true}
      width={600}
    >
      <div className="modal-header w-full text-xl font-semibold">
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
        <form className="w-full mt-5" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-secondary text-sm mb-4">
            Type <span className="font-semibold italic">delete</span> in the
            field below to confirm.
          </label>
          <input
            {...form("confirmDelete")}
            name="confirmDelete"
            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
            type="text"
            placeholder="Type delete to confirm"
          />
          <ErrorMessage errorMessage={errors?.["confirmDelete"]?.message} />
          <div className="flex items-center justify-end w-full mt-7">
            <Button
              type="submit"
              label="Keep Account"
              variant="outlined"
              className="mr-4"
              onClick={() => setModalOpen(false)}
            />
            <Button
              type="submit"
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
