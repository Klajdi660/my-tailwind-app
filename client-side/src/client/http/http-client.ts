import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry from "axios-retry";
import { store } from "../../store/redux";
import { deleteUser } from "../../store/redux/slices/auth.slice";
import { APP_URL, AXIOS_TIMEOUT_DURATION } from "../../configs";
import { globalObject } from "../../utils";

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getToken = async (type = "l", authorise = 1) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": localStorage.rToken,
  };

  try {
    if (!localStorage.rToken) throw new Error("Error Auth!");
    let response = await instance.post(
      `${APP_URL}/auth/token_${type}`,
      { authorise: 1 },
      { headers }
    );
    if (response.status === 200) {
      let { data } = response;
      return data[`${type}Token`];
    } else {
      throw new Error("Error Auth!");
    }
  } catch {
    delete localStorage.rToken;
    delete localStorage.user;
    delete localStorage.lastLocation;
    window.location.reload();
  }
};

axiosRetry(instance, {
  retries: 1,
  async retryCondition(error) {
    switch (error.response?.status) {
      case 401:
        if (error.config?.method === "get") {
          globalObject.lToken = await getToken("l");
        }
        return true;
      default:
        return false;
    }
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.url?.includes("auth/logout")) {
      config.headers.Authorization = `Bearer ${localStorage.atoken}`;
      return config;
    }

    if (config.url?.includes("auth")) return config;

    if (config.method === "get") {
      globalObject.lToken = globalObject.lToken || localStorage.lToken; //(await getToken("l"));
      // config.headers["x-access-token"] = globalObject.lToken;
      config.headers.Authorization = `Bearer ${localStorage.ltoken}`;
      return config;
    }

    // config.headers["x-access-token"] = await getToken("s");
    config.headers.Authorization = localStorage.atoken;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (error.response && error.response.status === 401) {
      try {
        store.dispatch(deleteUser());
        const rToken = localStorage.rtoken;
        const response = await instance.post("/refresh", { rToken });
        const { atoken } = response.data;

        localStorage.atoken = atoken;

        originalRequest.headers["Authorization"] = `Bearer ${atoken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error(`Axios Response Error: ${error}`);
      }
    }

    return Promise.reject(error);
  }
);

export class HttpClient {
  static instance = instance;

  static async get<T>(url: string, params?: unknown, options?: any) {
    console.log("url :>> ", url);
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: unknown, options?: any) {
    console.log("url :>> ", url);
    const response = await this.instance.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await this.instance.put<T>(url, data);
    return response.data;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await this.instance.patch<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await this.instance.delete<T>(url);
    return response.data;
  }
}
