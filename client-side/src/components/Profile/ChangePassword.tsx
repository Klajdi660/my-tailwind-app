import { FunctionComponent, useMemo } from "react";
import { Form } from "../Auth";
import { Icon, PatternBg } from "../UI";
import { changePasswordList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import { ChangePasswordProps, ChangePasswordInput } from "../../types";
import { updatePasswordValidation } from "../../utils";

export const ChangePassword: FunctionComponent<ChangePasswordProps> = () => {
  const { user } = useAuth();
  const { changePassword } = useProfileService();

  let isPasswordEnabled = user?.provider === "Email";

  const listForm = useMemo(() => {
    return changePasswordList(isPasswordEnabled);
  }, [isPasswordEnabled]);

  const handleOnSubmit = async (values: ChangePasswordInput) => {
    try {
      await changePassword(values);
    } catch (error) {
      console.error(`Failed to change password! ${error}`);
    }
  };

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card overflow-hidden">
      <PatternBg />
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
