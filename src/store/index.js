import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // preurl: "http://47.96.225.103",
    preurl: "http://localhost:8080/host",
    user: {
      // id: 0,
      // loginName: "",
      // password:
      //   "",
      // name: "",
      // email: "",
      // mobile: "",
      // userType: "",
      // chageRight: "",
      // photo: "",
      // username: "",
    },
  },
  mutations: {
    geturl(state) {
      return state.weburl;
    },
    setuser(state, userdata) {
      state.user = userdata;
    },
  },
  actions: {
    updatauser(context, user) {
      context.commit("seruser", user);
    },
  },
  modules: {},
});
