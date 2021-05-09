import Gudang from "../api/Gudang";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    gudang: [],
    belanja: [],
    akuntan: [],
  },
  actions: {
    AddBelanja({ dispatch }, form) {
      Gudang.addbelanja(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          dispatch("AllGudang");
          return dispatch("AllBelanja");
        }
        return cookies.set("next", 0);
      });
    },
    AllBelanja({ commit }, form) {
      Gudang.allbelanja(form).then((data) => {
        return commit("allbelanja", data.data.data);
      });
    },
    CancelBelanja({ dispatch }, id) {
      Gudang.cancelbelanja(id).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          dispatch("AllGudang");
          return dispatch("AllBelanja");
        }
        return cookies.set("next", 0);
      });
    },
    AllGudang({ commit }, page) {
      Gudang.allgudang(page).then((data) => {
        return commit("AllGudang", data.data.data);
      });
    },
    AllAkuntan({ commit }) {
      Gudang.akuntan().then((data) => {
        console.log(data.data);
        return commit("AllAkuntan", data.data.data);
      });
    },
  },
  mutations: {
    allbelanja(state, payload) {
      state.belanja = payload;
    },
    AllGudang(state, payload) {
      state.gudang = payload;
    },
    AllAkuntan(state, payload) {
      state.akuntan = payload;
    },
  },
};
