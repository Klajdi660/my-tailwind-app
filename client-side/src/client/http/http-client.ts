import axios, { AxiosError, /*AxiosResponse,*/ InternalAxiosRequestConfig } from 'axios';
// import axiosRetry from 'axios-retry';
// import { getToken, globalObject } from '../../utils';
// import { store } from '../../store/redux';
// import { deleteUser } from '../../store/redux/slices/auth';
import { APP_URL, AXIOS_TIMEOUT_DURATION } from '../../configs';

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.url?.includes("auth/logout")) {
      config.headers.Authorization = `Bearer ${localStorage.atoken}`;
      return config;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

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
