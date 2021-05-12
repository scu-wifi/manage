import { Message } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.component(Message.name, Message);

// router.beforeEach((to, from, next) => {
//   if (window.sessionStorage.getItem("tokenStr")) {
//     next();
//   } else {
//     if (to.path == "/") next();
//     else next("/redirect=" + to.path);
//   }
// });

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
