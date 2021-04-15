import Mitra from "../api/Mitra";
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
        if (res.data.error_code == 0) {
          commit("mitra", data.data.data);
          cookies.set("type", 0);
          cookies.set("next", 1);
          return cookies.set("username", data.data.data.username);
        }
        cookies.set("next", 0);
        return false;
      });
    },
    AddMitra({ commit }, data) {
      Mitra.addmitra(data).then((res) => {
        console.log(res);
        if (res.data.error_code == 0) {
          commit("newmitra");
        }
        return false;
      });
    },
    AllMitra({ commit }) {
      Mitra.allmitra().then((data) => {
        return commit("mitrall", data.data.data);
      });
    },
    AllCabang({ commit }) {
      Mitra.allCabang().then((data) => {
        console.log(data.data.data);
        return commit("cabangall", data.data.data);
      });
    },
    AddCabang({ commit }, form) {
      Mitra.addCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          console.log("Berhasil");
          return commit("newcabang", data.data.data);
        }
        console.log("Gagal");
        return false;
      });
    },
    UpdateCabang({ commit }, form) {
      Mitra.updateCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          console.log("Berhasil update");
          return commit("updatecabang", data.data.data);
        }
        console.log("Gagal");
        return false;
      });
    },
    DeleteCabang({ commit }, form) {
      Mitra.deleteCabang(form).then((data) => {
        if (data.data.error_code == 0) {
          console.log("Berhasil delete");
          return commit("deletecabang", form);
        }
        console.log("Gagal");
        return false;
      });
    },
  },
  mutations: {
    mitra(state, payload) {
      state.user = payload;
    },
    mitrall(state, payload) {
      state.mitrall = payload;
    },
    newmitra(state) {
      this.dispatch("AllMitra");
      return state;
    },
    cabangall(state, payload) {
      state.cabangall = payload;
    },
    newcabang(state, payload) {
      state.cabangall.push(payload);
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
