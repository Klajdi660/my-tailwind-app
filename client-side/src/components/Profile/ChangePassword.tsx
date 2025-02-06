import { FC, useMemo } from "react";
import { useAppSelector } from "../../store";
import { Form, Icon } from "../../components";
import { changePasswordList } from "../../data";
import { useProfileService } from "../../services";
import { ChangePasswordValues } from "../../types";
import { updatePasswordValidation } from "../../utils";

export const ChangePassword: FC = () => {
  const { changePassword } = useProfileService();

  const { user } = useAppSelector((state) => state.user);

  const { provider } = user;

  let isPasswordEnabled = provider === "Email";

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
    <div className="bg-card md:p-8 p-4 rounded">
      <div className="pb-6">
        <h5 className="text-lg font-semibold">Change Password</h5>
        {!isPasswordEnabled && (
          <span className="flex items-center gap-1 text-sm text-yellow-500 ">
            <Icon
              name="PiWarningCircleBold"
              className="!text-yellow-500"
              size={16}
            />
            Accounts authenticated with {provider} Oauth cannot update password!
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
