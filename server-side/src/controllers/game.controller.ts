import { Request, Response } from "express";
import rwgApi from "../rwg/rwg.api";

export const gameListHandler = async (req: Request, res: Response) => {
    const { rwgType } = req.params;
    const { page, pageSize } = req.query;

    let params = {
        page,
        page_size: pageSize
    };

    const pageNumber = parseInt(page as string) || 1;
    const page_size = parseInt(pageSize as string) || 50;

    const startIndex = (pageNumber - 1) * page_size;
    const endIndex = startIndex + page_size;
    console.log('startIndex :>> ', startIndex);
    console.log('endIndex :>> ', endIndex);
    const response = await rwgApi.gameList(rwgType, params) as any;
    const paginatedData = response.results.slice(startIndex, endIndex);

    console.log('response.result.length :>> ', paginatedData.length);
    res.json({ error: false, data: paginatedData });
};