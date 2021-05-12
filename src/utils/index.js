import axios from "axios";
import { Message } from "element-ui";
axios.interceptors.request.use(
  (config) => {
    if (window.sessionStorage.getItem("tokenStr")) {
      config.headers["Authorization"] = window.sessionStorage.getItem(
        "tokenStr"
      );
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

axios.interceptors.response.use(
  (success) => {
    if (success.status && success.status == 200) {
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        Message.error({ message: success.data.message });
        return;
      }
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    console.log(success.data);
    return success.data;
  },
  (error) => {
    if (error.response.code == 504 || error.response.code == 404) {
      Message.error({ message: "找不到服务器" });
    } else if (error.response.code == 403) {
      Message.error({ message: "权限不足" });
    } else if (error.response.code == 401) {
      Message.error({ message: "尚未登录" });
      router.replace("/");
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message });
      } else {
        Message.error({ message: "未知错误！" });
      }
    }
    return;
  }
);

// const base = "http://127.0.0.1/data";
// export const postRequest = (url, parmas) => {
//   return axios.post({
//     method: "post",
//     url: base + url,
//     data: parmas,
//   });
// };
