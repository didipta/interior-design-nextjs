import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    if (error.response.status == 401) {
      // GlobalFunction.logOut()
      localStorage.removeItem("token");
      localStorage.removeItem("session_info");
      window.location.href = window.location.origin;
    } else if (error.response.status == 500) {
      // window.location.href = window.location.origin + '/error-500'
      window.location.href = window.location.origin + "/404";
    } else if (error.response.status == 404) {
      window.location.href = window.location.origin + "/404";
    }
    return Promise.reject(error);

    // return Promise.reject(error);
  }
);

export { instance };
