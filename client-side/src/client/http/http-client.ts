// import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import axiosRetry from 'axios-retry';
// import { getToken, globalObject } from '../../utils';
// import { store } from '../../store/redux';
// import { deleteUser } from '../../store/redux/slices/auth';
import axios from "axios";
import { APP_URL, AXIOS_TIMEOUT_DURATION } from '../../configs';

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosRetry(instance, {
//   retries: 1,
//   async retryCondition(error) {
//     switch (error.response?.status) {
//       case 401:
//         if (error.config?.method === "get") {
//           let token = await getToken("l");
//           globalObject.lToken = token;
//         }
//         return true;
//       default:
//         return false;
//     }
//   },
// });

// instance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     let token;
//     if (!config.url?.includes("auth")) {
//       if (config.method === "get") {
//         token = globalObject.lToken || await getToken("l");
//         globalObject.lToken = token;
//       }
//       else token = await getToken("s");
//     }
//     config.headers["x-access-token"] = token || localStorage.rToken;
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error),
// );

// instance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(deleteUser());
//     }

//     return Promise.reject(error);
//   },
// );

// instance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const token = store.getState().auth.accessToken
  
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error: AxiosError) => Promise.reject(error),
// )

// instance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(deleteUser())
//     }

//     return Promise.reject(error)
//   },
// )

export class HttpClient {
  static instance = instance;

  static async get<T>(url: string, params?: unknown, options?: any) {
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  };

  static async post<T>(url: string, data?: unknown, options?: any) {
    const response = await this.instance.post<T>(url, data, options);
    return response.data;
  };

  static async put<T>(url: string, data: unknown) {
    const response = await this.instance.put<T>(url, data);
    return response.data;
  };

  static async patch<T>(url: string, data: unknown) {
    const response = await this.instance.patch<T>(url, data);
    return response.data;
  };

  static async delete<T>(url: string) {
    const response = await this.instance.delete<T>(url);
    return response.data;
  };
};
