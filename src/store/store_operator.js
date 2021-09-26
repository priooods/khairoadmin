import router from "../router/index";
import Operator from "../api/Operator";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    user: [],
    userall: [],
    operator: [],
    deleteoperator: [],
    updateoperator: [],
    admin: [],
    newuser: [],
  },
  actions: {
    loginoperator({ commit }, form) {
      return new Promise((resolve, reject) => {
        Operator.LoginOperator(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              commit("userinfo", data.data.data);
              cookies.set("type", 1);
              cookies.set("next", 1);
              cookies.set("username", data.data.data.username);
              return resolve(data);
            }
            return cookies.set("next", 0);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    addoperator({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Operator.AddOperator(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              cookies.set("next", 1);
              dispatch("allOperator");
              return resolve(data);
            }
            cookies.set("next", 0);
            return false;
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    updateOperator({ dispatch }, username) {
      return new Promise((resolve, reject) => {
        Operator.UpdateOperator(username)
          .then((dt) => {
            if (dt.data.error_code == 0) {
              cookies.set("next", 1);
              dispatch("allOperator");
              return resolve(dt);
            }
            return cookies.set("next", 0);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    Search({ commit }, params) {
      return new Promise((resolve, reject) => {
        Operator.SearchOperator(params)
          .then((data) => {
            commit("userall", data.data);
            return resolve(data.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    allOperator({ commit }, params) {
      return new Promise((resolve, reject) => {
        Operator.AllOperator(params)
          .then((data) => {
            commit("userall", data.data);
            return resolve(data.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    deleteOperator({ dispatch }, username) {
      return new Promise((resolve, reject) => {
        Operator.DeleteOperator(username)
          .then((data) => {
            resolve(data);
            if (data.data.error_code == 0) {
              cookies.set("next", 1);
              return dispatch("allOperator");
            }
            return cookies.set("next", 0);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    logoutOperator({ commit }, username) {
      return new Promise((resolve, reject) => {
        Operator.LogoutOperator(username)
          .then((data) => {
            resolve(data);
            if (data.data.error_code == 0) {
              cookies.keys().forEach((cookie) => cookies.remove(cookie));
              router.push({ path: "/" }, () => {});
              return commit("logout");
            }
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
  mutations: {
    userinfo(state, payload) {
      state.user = payload;
    },
    userall(state, payload) {
      state.userall = payload;
    },
    logout(state) {
      return state;
    },
  },
};
