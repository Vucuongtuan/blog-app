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

export default http;
