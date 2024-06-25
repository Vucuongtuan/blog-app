import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

class HttpBaseFetch {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      withCredentials: true,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });
  }
}

const http = new HttpBaseFetch().instance;

http.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get("your_token_cookie_name");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
