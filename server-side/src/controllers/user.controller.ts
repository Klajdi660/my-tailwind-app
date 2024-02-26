import { Request, Response } from "express";
import { User } from "../models";
import { getUserById } from "../services/user.service";

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    const { rows: users, count: totalUsers } = await User.findAndCountAll({
        limit: +pageSize,
        offset,
        order: [["createdAt", "DESC"]], // Change the order as per your requirements
    });

    const totalPages = Math.ceil(totalUsers / pageSize);
    console.log('totalPages :>> ', totalPages);
    console.log('users :>> ', users);
    res.json({ error: false, data: { totalPages, users }})
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) {
        res.json({ error: true, message: "User does not exist in our database!" });
    }

    res.json({ error: false, data: user });
}; 
