import Mitra from "../api/Mitra";
import router from "../router/index";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    user: [],
    mitrall: [],
    cabangall: [],
  },
  actions: {
    LoginMitra({ commit }, data) {
      Mitra.loginmitra(data).then((res) => {
        console.log(res.data.data);
        if (res.data.error_code == 0) {
          commit("mitra", res.data.data);
          cookies.set("type", 0);
          cookies.set("next", 1);
          return cookies.set("username", res.data.data.username);
        }
        cookies.set("next", 0);
        return false;
      });
    },
    AddMitra({ dispatch }, data) {
      Mitra.addmitra(data).then((res) => {
        console.log(res.data);
        if (res.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllMitra");
        }
        cookies.set("next", 0);
        return false;
      });
    },
    DeleteMitra({ dispatch }, data) {
      Mitra.deletemitra(data).then((res) => {
        if (res.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllMitra");
        }
        return cookies.set("next", 0);
      });
    },
    AllMitra({ commit }) {
      Mitra.allmitra().then((data) => {
        return commit("mitrall", data.data.data);
      });
    },
    AllCabang({ commit }) {
      Mitra.allCabang().then((data) => {
        return commit("cabangall", data.data.data);
      });
    },
    AddCabang({ dispatch }, form) {
      Mitra.addCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllCabang");
        }
        return cookies.set("next", 0);
      });
    },
    UpdateCabang({ commit }, form) {
      Mitra.updateCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("updatecabang", data.data.data);
        }
        return cookies.set("next", 0);
      });
    },
    UpdateMitra({ dispatch }, form) {
      Mitra.updatemitra(form).then((data) => {
        console.log(data.data);
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllMitra");
        }
        return cookies.set("next", 0);
      });
    },
    DeleteCabang({ commit }, form) {
      Mitra.deleteCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("deletecabang", form);
        }
        return cookies.set("next", 0);
      });
    },
    LogoutMitra({ commit }, form) {
      Mitra.logoutMitra(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.keys().forEach((cookie) => cookies.remove(cookie));
          router.push({ path: "/" }, () => {});
          return commit("logout");
        }
      });
    },
  },
  mutations: {
    logout(state) {
      return state;
    },
    mitra(state, payload) {
      state.user = payload;
    },
    mitrall(state, payload) {
      state.mitrall = payload;
    },
    cabangall(state, payload) {
      state.cabangall = payload;
    },
    updatecabang(state, payload) {
      var index = state.cabangall.findIndex((x) => x.id === payload.id);
      state.cabangall.splice(index, 1, payload);
      return this.commit("mitra/cabangall", state.cabangall);
    },
    deletecabang(state, payload) {
      var adm = state.cabangall.findIndex((e) => e.id === payload.id);
      return state.cabangall.splice(adm, 1);
    },
  },
};
