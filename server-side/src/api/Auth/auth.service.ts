import config from "config";
import otpGenerator from "otp-generator";
import { User } from "../../models";
import { OtpSettings } from "../../types";

const { otpLength, otpConfig } = config.get<OtpSettings>("otp");

export const updateUserPassword = async (hash: string, id: string) => {
    const update = User.update(
        { hash },
        { where: { id }}
    );
    return update;
};


export const generateUniqueOTP = () => {
    const otp = otpGenerator.generate(otpLength, {
        ...otpConfig
    }); 

    return otp;
};
