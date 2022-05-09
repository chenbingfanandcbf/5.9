import Axios from "axios";
import { Message } from "element-ui";
// import Nprogress from 'nprogress'
import * as moment from 'moment';
const service = Axios.create({
  baseURL: "http://www.ysqorz.top:8888/api/private/v1",
  timeout: 5000,
});
service.interceptors.request.use(
  (config) => {
    // Nprogress.start()
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (res) => {
    const {
      meta: { msg, status: code },
      data: result,
    } = res.data;
    const successCode = [200, 201, 204];
    if (successCode.includes(code)) {
      Message({
        message: msg,
        type: "success",
      });
      if (res.config.url === "/login") {
        sessionStorage.setItem("token", result.token);
      }
      return result;
    }
    Message({
      message: msg,
      type: "error",
    });
    return Promise.reject(msg);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;