import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import axiosRetry from 'axios-retry';
import { AXIOS_TIMEOUT_DURATION } from '../../config';

const instance = axios.create({
    baseURL: "",
    timeout: AXIOS_TIMEOUT_DURATION,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axiosRetry(instance, {
//     retries: 1,
//     async retryCondition(error) {
//       switch (error.response?.status) {
//         case 401:
//         //   if (error.config?.method === "get") {
//         //     let token = await getToken("l")
//         //     globalObject.lToken = token
//         //   }
//           return true;
//         default:
//           return false;
//       }
//     },
// });

export class HttpClient {
    static instance = instance
  
    static async get<T>(url: string, params?: unknown, options?: any) {
      const response = await this.instance.get<T>(url, { params })
  
      return response.data
    }
  
    static async post<T>(url: string, data?: unknown, options?: any) {
      const response = await this.instance.post<T>(url, data, options)
      return response.data
    }
  
    static async put<T>(url: string, data: unknown) {
      const response = await this.instance.put<T>(url, data)
  
      return response.data
    }
  
    static async patch<T>(url: string, data: unknown) {
      const response = await this.instance.patch<T>(url, data)
  
      return response.data
    }
  
    static async delete<T>(url: string) {
      const response = await this.instance.delete<T>(url)
  
      return response.data
    }
}
