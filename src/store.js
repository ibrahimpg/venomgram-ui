import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.username,
    token: localStorage.token,
  },
  mutations: {
    setUser() {
      this.state.username = localStorage.username;
      this.state.token = localStorage.token;
    },
  },
  actions: {

  },
});
