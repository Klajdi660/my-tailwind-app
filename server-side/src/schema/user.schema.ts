import { number, object, string, TypeOf } from "zod";

export const createAllUserSchema = object({
    query: object({
        page: number({
            required_error: "Page is required",
        }),
        pageSize: number({
            required_error: "Page size is required",
        }),
    })
});

export const createUserByIdSchema = object({
    params: object({
        id: string({
            required_error: "Id is requeired",
        })
    }),
});

export type AllUserInput = TypeOf<typeof createAllUserSchema>["query"];
export type UserByIdInput = TypeOf<typeof createUserByIdSchema>["params"];

 