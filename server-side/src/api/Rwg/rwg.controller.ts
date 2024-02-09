import rwgApi from "../../rwg/rwg.api";

export const gameListHandler = async (rwgType: string, page: number | any, pageSize: any) => {
    let params = {
        page,
        page_size: pageSize
    };
    
    const pageNumber = parseInt(page) || 1;
    const page_size = parseInt(pageSize) || 50;

    const startIndex = (pageNumber - 1) * page_size;
    const endIndex = startIndex + page_size;
    console.log('startIndex :>> ', startIndex);
    console.log('endIndex :>> ', endIndex);
    const response = await rwgApi.gameList(rwgType, params) as any;
    const paginatedData = response.results.slice(startIndex, endIndex);

    console.log('response.result.length :>> ', paginatedData.length);
    return paginatedData;
};