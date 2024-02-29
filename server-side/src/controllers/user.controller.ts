import { Request, Response } from "express";
import { User } from "../models";
import { getUserById } from "../services/user.service";

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

    const user = await getUserById(id);
    if (!user) {
        res.json({ error: true, message: "User does not exist in our database!" });
    }

    res.json({ error: false, data: user });
}; 
