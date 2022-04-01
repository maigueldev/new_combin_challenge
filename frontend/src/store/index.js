import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    data: [],
    statusCreate: {
      error: false,
      success: false,
    },
  },
  getters: {
    getUserData: function (state) {
      return state.userData;
    },
    getData: function (state) {
      return state.data;
    },
    getStatusCreate: function (state) {
      return state.statusCreate;
    },
    getHasError: function (state) {
      return state.statusCreate.error;
    },
    getHasSuccess: function (state) {
      return state.statusCreate.success;
    },
  },
  mutations: {
    setDataUser: function (state, data) {
      state.userData = data;
    },
    setData: function (state, data) {
      state.data = data;
    },
    setStatusCreate: function (state, value) {
      state.statusCreate = value;
    },
  },
  actions: {
    userLogin: async function () {
      const URL = "http://localhost:8081/auth";
      await axios
        .post(URL, {
          username: "sarah",
          password: "connor",
        })
        .then((response) => {
          this.commit("setDataUser", response.data);
        });
    },
    getDataList: async function ({ state }) {
      const URL = "http://localhost:8081/api/members";
      const headers = {
        Authorization: `Bearer ${state.userData.token}`,
      };
      await axios.get(URL, { headers: headers }).then((response) => {
        this.commit("setData", response.data);
      });
    },
    create: async function ({ state }, data) {
      const URL = "http://localhost:8081/api/members";
      const headers = {
        Authorization: `Bearer ${state.userData.token}`,
      };
      await axios
        .post(URL, data, { headers: headers })
        .then(() => {
          this.dispatch("setSuccessCreate");
        })
        .catch(() => {
          this.dispatch("setErrorCreate");
        });
    },
    setErrorCreate: function () {
      const status = { error: true, success: false };
      this.commit("setStatusCreate", status);
    },
    setSuccessCreate: function () {
      const status = { error: false, success: true };
      this.commit("setStatusCreate", status);
    },
  },
});
