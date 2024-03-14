import { FunctionComponent, useMemo } from "react";
import { Form } from "../Auth/Form";
import { PatternBg, Icons } from "../UI";
import { updatePasswordValidation } from "../../utils/validations";

interface ChangePasswordProps {
    provider: string | any;
};

export const ChangePassword: FunctionComponent<ChangePasswordProps> = (props) => {
    const { provider } = props;

    let isPasswordEnabled = provider === "Email"; 

    const list = useMemo(() => {
        return [
            {
                formName: "password",
                formTitle: "Change Password",
                btnTxt: "Update Password",
            },
            {
                type: "input",
                name: "newPassword",
                label: "New Password",
                props: {
                    disabled: !isPasswordEnabled,
                    type: "password",
                    placeholder: "",
                },
            },
            {
                type: "input",
                name: "confirmNewPassword",
                label: "Confirm New Password",
                props: {
                    disabled: !isPasswordEnabled,
                    type: "password",
                    placeholder: "",
                },
            },
        ];
    }, [isPasswordEnabled]);

    return (
        <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
            <PatternBg />
            <div className="mb-4 header">
                <h5 className="text-lg font-semibold">Change Password</h5>
                {!isPasswordEnabled && (
                    <span className="flex items-center gap-1 text-sm text-yellow-500 ">
                        <Icons
                            name="PiWarningCircleBold"
                            className="!text-yellow-500"
                            size={16}
                        />
                        Accounts authenticated with {provider} Oauth cannot update password!
                    </span>
                )}
            </div>
            <Form
                lists={list}
                schema={updatePasswordValidation}
                defaultValues={{
                    newPassword: !isPasswordEnabled ? "**********" : "",
                    confirmNewPassword: !isPasswordEnabled ? "**********" : "",
                }}
            />
        </div>
    );
};