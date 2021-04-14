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
        cookies.set("username", data.data.data.username);
        return router.push({ path: "base/home" }, () => {});
      }
      console.log(data);
      return false;
    });
  },
  addoperator({ commit }, form) {
    Operator.AddOperator(form).then((data) => {
      if (data.data.error_code == 0) {
        return commit("newuser", data.data.data);
      }
      return false;
    });
  },
  updateOperator({ commit }, username) {
    Operator.UpdateOperator(username).then((dt) => {
      return commit("updateoperator", dt.data.data);
    });
  },
  allOperator({ commit }) {
    Operator.AllOperator().then((data) => {
      return commit("userall", data.data.data);
    });
  },
  deleteOperator({ commit }, username) {
    Operator.DeleteOperator(username).then(() => {
      return commit("deleteoperator", username);
    });
  },
  logoutOperator({ commit }, username) {
    Operator.LogoutOperator(username).then((data) => {
      if (data.data.error_code == 0) {
        cookies.keys().forEach((cookie) => cookies.remove(cookie));
        router.push({ path: "/" }, () => {});
        window.location.reload();
        return commit(null);
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
    if (payload == null) return (state.userall = payload);
    state.admin = payload.filter((e) => {
      return e.type == "Admin";
    });
    state.operator = payload.filter((e) => {
      return e.type == "Operator";
    });
  },
  newuser(state, payload) {
    state.userall.push(payload);
    if (payload.type === "Admin") {
      return state.admin.push(payload);
    } else {
      return state.operator.push(payload);
    }
  },
  deleteoperator(state, payload) {
    if (payload.type === "Admin") {
      var adm = state.admin.findIndex((e) => e.id === payload.id);
      return state.admin.splice(adm, 1);
    } else {
      var opt = state.operator.findIndex((e) => e.id === payload.id);
      return state.operator.splice(opt, 1);
    }
  },
  updateoperator(state, payload) {
    var index = state.userall.findIndex((x) => x.id === payload.id);
    state.userall.splice(index, 1, payload);
    return this.commit("operat/userall", state.userall);
  },
  resetState(state) {
    Object.assign(state, defaultState());
  },
};

export default {
  namespaced: true,
  getters: {},
  state,
  actions,
  mutations,
};
