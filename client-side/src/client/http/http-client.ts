import axios, {
  AxiosError,
  // AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { APP_URL, AXIOS_TIMEOUT_DURATION } from "../../configs";
import { store } from "../../store";

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const { user, saveAuthUserData } = state.user;

    if (config.url?.includes("auth/login-saved-user")) {
      //   const loggedInUser = saveAuthUserData.find(
      //     (savedUser) => savedUser.id === user.id
      //   );
      //   config.headers.Authorization = `Bearer ${loggedInUser?.saveAuthUserToken}`;
      return config;
    }

    const token =
      config.method === "get" ? localStorage.atoken : localStorage.atoken;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// instance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const originalRequest: any = error.config;

//     if (error.response && error.response.status === 401) {
//       try {
//         store.dispatch(deleteUser());
//         const rToken = localStorage.rtoken;
//         const response = await instance.post("/refresh", { rToken });
//         const { atoken } = response.data;

//         localStorage.atoken = atoken;

//         originalRequest.headers["Authorization"] = `Bearer ${atoken}`;
//         return axios(originalRequest);
//       } catch (error) {
//         console.error(`Axios Response Error: ${error}`);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export class HttpClient {
  static instance = instance;

  static async get<T>(url: string, params?: unknown, options?: any) {
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: unknown, options?: any) {
    const response = await this.instance.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown, options?: object) {
    const response = await this.instance.put<T>(url, data, options);
    return response.data;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await this.instance.patch<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string, data?: any) {
    const response = await this.instance.delete<T>(url, { data });
    return response.data;
  }
}
