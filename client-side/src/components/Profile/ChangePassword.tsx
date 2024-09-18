import { FC, useMemo } from "react";
import { Form } from "../Auth";
import { Icon } from "../UI";
import { changePasswordList } from "../../data";
import { useAppSelector } from "../../store";
import { useProfileService } from "../../services";
import { ChangePasswordProps, ChangePasswordValues } from "../../types";
import { updatePasswordValidation } from "../../utils";

export const ChangePassword: FC<ChangePasswordProps> = () => {
  const { user } = useAppSelector((state) => state.user);
  const { changePassword } = useProfileService();

  let isPasswordEnabled = user?.provider === "Email";

  const listForm = useMemo(() => {
    return changePasswordList(isPasswordEnabled);
  }, [isPasswordEnabled]);

  const handleOnSubmit = async (values: ChangePasswordValues) => {
    try {
      await changePassword(values);
    } catch (error) {
      console.error(`Failed to change password! ${error}`);
    }
  };

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Change Password</h5>
        {!isPasswordEnabled && (
          <span className="flex items-center gap-1 text-sm text-yellow-500 ">
            <Icon
              name="PiWarningCircleBold"
              className="!text-yellow-500"
              size={16}
            />
            Accounts authenticated with {user?.provider} Oauth cannot update
            password!
          </span>
        )}
      </div>
      <Form
        listForm={listForm}
        schema={updatePasswordValidation}
        onSubmit={handleOnSubmit}
        defaultValues={{
          currentPassword: !isPasswordEnabled ? "**********" : "",
          newPassword: !isPasswordEnabled ? "**********" : "",
          confirmNewPassword: !isPasswordEnabled ? "**********" : "",
        }}
      />
    </div>
  );
};
