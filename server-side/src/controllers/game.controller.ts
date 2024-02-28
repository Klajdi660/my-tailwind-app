import { Request, Response } from "express";
import axios from "axios";
import config from "config";
// import rwgApi from "../rwg/rwg.api";
import { getAuthToken } from "../twitch/common";
// import { json } from "sequelize";

const { tw_base_url, tw_client_id } = config.get<any>("twitch");

export const gameListHandler = async (req: Request, res: Response) => {
    const token = await getAuthToken();
    console.log('token :>> ', token);
    if (!token) {
        return res.json({ error: true, message: "Authentication Failed!" });
    }
    
    const headers = {
        "Accept": "application/json",
        "Client-ID": tw_client_id,
        "Authorization": `Bearer ${token}`,
    };

    const payload = {};
    const games = await axios(`${tw_base_url}/games`, {
        method: "POST",
        headers,
        data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
    })
        .then((res) => res.data)
        .catch((e) => {
            console.log('e.response.data :>> ', e.response.data);
        });
        console.log('games :>> ', games.length);

        return res.json(games.length)
    // const { rwgType } = req.params;
    // const { page, pageSize } = req.query;

    // let params = {
    //     page,
    //     page_size: pageSize
    // };

    // const pageNumber = parseInt(page as string) || 1;
    // const page_size = parseInt(pageSize as string) || 50;

    // const startIndex = (pageNumber - 1) * page_size;
    // const endIndex = startIndex + page_size;
    // console.log('startIndex :>> ', startIndex);
    // console.log('endIndex :>> ', endIndex);
    // const response = await rwgApi.gameList(rwgType, params) as any;
    // const paginatedData = response.results.slice(startIndex, endIndex);

    // console.log('response.result.length :>> ', paginatedData.length);
    // res.json({ error: false, data: paginatedData });
};