import { HttpClient } from "../clients";
import { GameListParams } from "../types";

const rwgApi = {
    gameList: async (rwgType: string, params: Object) => await HttpClient.get<GameListParams>(rwgType, params),
};

export default rwgApi;
