import config from "config";
import dayjs from "dayjs";
import otpGenerator from "otp-generator";
import { User } from "../../models";
import { OtpSettings } from "../../types";

const { otpLength, otpConfig } = config.get<OtpSettings>("otp");

export const updateUserPassword = async (hash: string, id: string) => {
    const currentTimestamp = dayjs().toDate();

    const update = User.update(
        { hash, updatedAt: currentTimestamp },
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
