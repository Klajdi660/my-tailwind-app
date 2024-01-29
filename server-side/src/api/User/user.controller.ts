import { User } from "../../models";

export const userHandler = async (page: number, pageSize: number) => {
    console.log('page :>> ', page);
    console.log('pageSize :>> ', pageSize);
    const offset = (page - 1) * pageSize;
    console.log('offset :>> ', offset);
    const { rows: users, count: totalUsers } = await User.findAndCountAll({
        limit: +pageSize,
        offset,
        order: [["createdAt", "DESC"]], // Change the order as per your requirements
    });

    const totalPages = Math.ceil(totalUsers / pageSize);
    console.log('totalPages :>> ', totalPages);
    console.log('users :>> ', users);
};
