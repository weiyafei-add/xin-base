import axios, { AxiosInstance } from "axios";
import { createOption } from "./types";

function validateStatus() {
  return true;
}

function createHttp(opts?: createOption): AxiosInstance {
  const header = Object.assign(
    { "X-Requested-With": "XMLHttpRequest" },
    opts && opts.headers
  );
  const option = {
    ...opts,
    header,
  };

  const { requestInterceptor, responseInterceptor } = option;

  const http = axios.create(option);

  http.interceptors.request.use(function (config) {
    if (typeof window === "undefined") {
      config.validateStatus = validateStatus;
    }
    if (typeof requestInterceptor === "function") {
      return requestInterceptor(config);
    }
    return config;
  });

  http.interceptors.response.use(
    function (response) {
      const result = response.data || {};
      if (typeof responseInterceptor === "function") {
        return responseInterceptor(response);
      }
      // 针对业务判断
      if (response.status === 200 && result.success) {
        return result.hasOwnProperty("data")
          ? result.data
          : result.hasOwnProperty("datas")
          ? result.datas
          : result;
      }
      return Promise.reject(response);
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return http;
}

export default createHttp;
