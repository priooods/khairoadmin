import router from "../router/index";
import Operator from "../api/Operator";
import cookies from "vue-cookies";

const defaultState = () => {
  return {
    user: [],
    userall: [],
    operator: [],
    deleteoperator: [],
    updateoperator: [],
    admin: [],
    newuser: [],
  };
};
const state = defaultState();

const actions = {
  resetState({ commit }) {
    commit("resetState");
  },
  loginoperator({ commit }, form) {
    Operator.LoginOperator(form).then((data) => {
      if (data.data.error_code == 0) {
        commit("userinfo", data.data.data);
        cookies.set("type", 1);
        cookies.set("next", 1);
        return cookies.set("username", data.data.data.username);
      }
      return cookies.set("next", 0);
    });
  },
  addoperator({ dispatch }, form) {
    Operator.AddOperator(form).then((data) => {
      if (data.data.error_code == 0) {
        cookies.set("next", 1);
        return dispatch("allOperator");
      }
      cookies.set("next", 0);
      return false;
    });
  },
  updateOperator({ dispatch }, username) {
    Operator.UpdateOperator(username).then((dt) => {
      if (dt.data.error_code == 0) {
        cookies.set("next", 1);
        return dispatch("allOperator");
      }
      return cookies.set("next", 0);
    });
  },
  allOperator({ commit }) {
    Operator.AllOperator().then((data) => {
      return commit("userall", data.data.data);
    });
  },
  deleteOperator({ dispatch }, username) {
    Operator.DeleteOperator(username).then((data) => {
      if (data.data.error_code == 0) {
        cookies.set("next", 1);
        return dispatch("allOperator");
      }
      return cookies.set("next", 0);
    });
  },
  logoutOperator({ commit }, username) {
    Operator.LogoutOperator(username).then((data) => {
      if (data.data.error_code == 0) {
        cookies.keys().forEach((cookie) => cookies.remove(cookie));
        router.push({ path: "/" }, () => {});
        return commit("logout");
      }
    });
  },
};

const mutations = {
  userinfo(state, payload) {
    state.user = payload;
  },
  userall(state, payload) {
    state.userall = payload;
  },
  resetState(state) {
    Object.assign(state, defaultState());
  },
  logout(state) {
    return state;
  },
};

export default {
  namespaced: true,
  getters: {},
  state,
  actions,
  mutations,
};
