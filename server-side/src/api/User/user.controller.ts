import { User } from "../../models";
import { getUserById } from "./user.service";

export const userHandler = async (page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;

    const { rows: users, count: totalUsers } = await User.findAndCountAll({
        limit: +pageSize,
        offset,
        order: [["createdAt", "DESC"]], // Change the order as per your requirements
    });

    const totalPages = Math.ceil(totalUsers / pageSize);
    console.log('totalPages :>> ', totalPages);
    console.log('users :>> ', users);
};

export const oneUserHandler = async (id: string) => {
    const user = await getUserById(id);
    if (!user) {
        return { error: true, message: "User does not exist in our database!" };
    }
    return user;
}; 
