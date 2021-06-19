import Vue from "vue";
import Vuex from "vuex";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Notification } from "element-ui";

// import config from "../../static/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    preurl: "http://121.4.159.103",

    // preurl: "http://localhost:8082/host",
    // preurl: this.$baseurl,
    user: {},
    stomp: null,
    success: null,
    eqstatedata: null,
  },
  mutations: {
    geturl(state) {
      return state.weburl;
    },
    setuser(state, userdata) {
      state.user = userdata;
    },
    seteqdata(state, data) {
      state.eqstatedata = data;
    },
  },
  actions: {
    updatauser(context, data) {
      context.state.eqstatedata = data;
    },
    connect(context) {
      context.state.stomp = Stomp.over(new SockJS("/websocket"));
      let tokenStr = window.sessionStorage.getItem("tokenStr");

      context.state.stomp.connect(
        { "Auth-Token": tokenStr },
        (sucess) => {
          context.state.success = sucess;
          context.state.stomp.subscribe("/user", (msg) => {
            Notification.error({
              title: "设备故障警告",
              message: msg.body,
              duration: 10000,
            });
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    disconnect(context) {
      context.state.stomp.disconnect();
    },
  },
  modules: {},
});
