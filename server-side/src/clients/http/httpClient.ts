import axios from "axios";
import config from "config";
import { RWGParams } from "../../types";

const { rwg_url, rwg_key } = config.get<RWGParams>("rwg");

const instance = axios.create({
    baseURL: rwg_url,
    params: {
        key: rwg_key,
    },
    headers: {
        "Content-Type": "application/json",
    },    
});

export class HttpClient {
    static instance = instance;

    static async get<T>(url: string, params?: unknown, options?: any) {
        console.log('params :>> ', params);
        const response = await this.instance.get<T>(url, { params });
        return response.data;
    };
};
