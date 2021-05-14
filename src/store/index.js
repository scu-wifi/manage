import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    preurl: "http://localhost",
    user: {},
  },
  mutations: {
    geturl(state) {
      return state.weburl;
    },
    setuser(userdata) {
      this.state.user = userdata;
    },
  },
  actions: {},
  modules: {},
});
