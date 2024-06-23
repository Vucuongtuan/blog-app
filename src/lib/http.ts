import axios, { AxiosInstance } from "axios";

class HttpBaseFetch {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });
  }
}

const http = new HttpBaseFetch().instance;
export default http;
