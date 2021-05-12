import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weburl: "localhost/data",
    user: {}
  },
  mutations: {
    geturl(state) {
      return state.weburl;
    }
  },
  actions: {},
  modules: {},
});
