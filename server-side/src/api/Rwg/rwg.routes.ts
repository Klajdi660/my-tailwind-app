import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils";
import { gameListHandler } from "./rwg.controller";

const rwgRouter = Router();

rwgRouter.get(
    "/:rwgType",
    asyncHandler(async (req: Request, res: Response) => {
        const { rwgType } = req.params;
        const { page, pageSize } = req.query;
        console.log('rwgType :>> ', rwgType, 'page', page);
        const response = await gameListHandler(rwgType, page, pageSize);
        res.json(response);
    })
);

export default rwgRouter;
