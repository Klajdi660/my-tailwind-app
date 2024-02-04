import { Op } from "sequelize";
import { User } from "../../models";
import { log } from "../../utils";
import { UserTypesParams } from "../../types";

export const getUserById = async (id: string) => {
    return User.findOne({
        where: { id }
    }).catch((error) => {
        log.error(`[UserById]: ${JSON.stringify({ action: "getUserByEmail catch", data: error })}`);
    })
};

export const getUserByEmail = async (email: string) => {
    return User.findOne({
        where: { email }
    }).catch((error) => {
        log.error(`[UserByEmail]: ${JSON.stringify({ action: "getUserByEmail catch", data: error })}`);
    })
};

export const getUserByEmailOrUsername = async (email: string, username: string) => {
    return User.findOne({
        where: {
            [Op.or]: [{ email }, { username }]
        }
    }).catch((error) => {
        log.error(`[UserByEmailOrUsername]: ${JSON.stringify({ action: "getUserByEmailOrUsername catch", data: error })}`);
    })
};

export const createUser = async (data: UserTypesParams) => {
    const { email, username, firstName, lastName, password, accountType } = data;

    const extraData = {
        firstName, 
        lastName,
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
    };

    const newUser = new User({
        email,
        username,
        hash: password,
        extra: JSON.stringify(extraData),
        // accountType,
        avatar: "",
    });

    const saveUser = await newUser
        .save()
        .catch((error) => {
            log.error(`[createUser]: ${JSON.stringify({ action: "createUser catch", data: error })}`);
        });

    return saveUser;
};
