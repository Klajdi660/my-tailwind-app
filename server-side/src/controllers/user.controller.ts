import { Request, Response } from "express";
import { User } from "../models";
import { getUserById, deleteUser, getAndUpdateUser } from "../services/user.service";

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const offset = (parsedPage - 1) * parsedLimit;

    const { rows: users, count: totalUsers } = await User.findAndCountAll({
        limit: parsedLimit,
        offset,
        // order: [["createdAt", "DESC"]], // sorted by createdAt
        order: [["id", "ASC"]], // sorted by id (1, 2, ...)
    });

    const totalPages = Math.ceil(totalUsers / parsedLimit);

    res.json({ 
        error: false, 
        data: { 
            users,
            totalPages,
            currentPage: parsedPage,
            totalUsers 
        }})
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await getUserById(+id);
    if (!user) {
        res.json({ error: true, message: "User does not exist in our database!" });
    }

    res.json({ error: false, data: user });
}; 

export const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await deleteUser(+id);
    if (!deletedUser) {
        return res.json({ error: true, message: "Unable to delete user!" });
    }

    res.json({ error: false, message: 'User deleted successfully' });
};

export const updateUserProfileHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const { extra } = req.body;

    const user = await getUserById(+id);
    if (!user) {
        return res.json({ error: true, message: "User not found!" });
    };

    const extraFields = JSON.parse(user.extra || '{}');
    const test = Object.assign(user, data);
    const test2 =  Object.assign(extraFields, extra || {});
    const test3 = JSON.stringify(extraFields);
    const test4 = test;
    console.log('test :>> ', test);
    console.log('test2 :>> ', test2);
    console.log('test3 :>> ', test3);
    console.log('test4 :>> ', test4);
    // const dataToSend = Object.assign(user, req.body);
    // console.log('dataToSend :>> ', dataToSend);
    // const updatedProfileUser = await getAndUpdateUser(+id, { username, extra: JSON.stringify(extraData) });
    // if (!updatedProfileUser) {
    //     return res.json({ error: true, message: "Profile not updated. Please try agin later." });
    // }

    res.json({ error: false, message: "Profile updated successfully!" });
};
