import config from "config";
import dayjs from "dayjs";
import otpGenerator from "otp-generator";
import { Op } from "sequelize";
import { User } from "../models";
import { log } from "../utils";
import { UserParams, OtpSettings } from "../types";

const { otpLength, otpConfig } = config.get<OtpSettings>("otp");

export const getUserById = async (id: string): Promise<User | any> => {
    return User.findOne({
        where: { id }
    }).catch((error) => {
        log.error(`${JSON.stringify({ action: "getUserByEmail catch", data: error })}`);
    })
};

export const getUserByEmail = async (email: string): Promise<User | any> => {
    return User.findOne({
        where: { email }
    }).catch((error) => {
        log.error(`${JSON.stringify({ action: "getUserByEmail catch", data: error })}`);
    })
};

export const getUserByEmailOrUsername = async (email: string, username: string): Promise<User | any> => {
    return User.findOne({
        where: {
            [Op.or]: [{ email }, { username }]
        }
    }).catch((error) => {
        log.error(`${JSON.stringify({ action: "getUserByEmailOrUsername catch", data: error })}`);
    })
};

export const createUser = async (data: UserParams, verified: boolean): Promise<User | any> => {
    const { email, username, firstName, lastName, password } = data;

    const extraData = {
        firstName, 
        lastName,
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
        photo: null,
    };

    const newUser = new User({
        email,
        username,
        password,
        googleId: "",
        extra: JSON.stringify(extraData),
        verified,
    });

    const saveUser = await newUser
        .save()
        .catch((error) => {
            log.error(`${JSON.stringify({ action: "createUser catch", data: error })}`);
        });

    return saveUser;
};

export const getAndUpdateUser = async (id: number, updatedField: { [key: string]: any }): Promise<User | any> => {
    const currentTimestamp = dayjs().toDate();
    updatedField.updatedAt = currentTimestamp;

    const update = User.update(
        updatedField,
        { where: { id }}
    );

    return update;
};

export const updateUserPassword = async (hash: string, id: string): Promise<User | any> => {
    const currentTimestamp = dayjs().toDate();

    const update = User.update(
        { hash, updatedAt: currentTimestamp },
        { where: { id }}
    );
    return update;
};

export const createVerificationCode = () => {
    const otp = otpGenerator.generate(otpLength, {
        ...otpConfig
    }); 

    return otp;
};

