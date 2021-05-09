import Jamaah from "../api/Jamaah";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    jamaahall: [],
    jamaahbayar: [],
  },
  actions: {
    AddJamaah({ dispatch }, form) {
      Jamaah.addjamaah(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("Alljamaah");
        }
        return cookies.set("next", 0);
      });
    },
    Alljamaah({ commit }, form) {
      Jamaah.alljamaah(form).then((data) => {
        return commit("alljamaah", data.data.data);
      });
    },
    JamaahBelumBayar({ commit }) {
      Jamaah.jamaahbelumbayar().then((data) => {
        return commit("jamaahbayar", data.data.data);
      });
    },
    PesananUpdate({ dispatch },  form) {
      Jamaah.pesananupdate(form).then((data) => {
        console.log(data.data.data);
        return dispatch("Alljamaah");
      });
    },
    BayarJamaah({ dispatch }, form) {
      Jamaah.jamaahbayar(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("Alljamaah");
        }
        return cookies.set("next", 0);
      });
    },
  },
  mutations: {
    newjamaah(state, payload) {
      state.jamaahall.push(payload);
    },
    alljamaah(state, payload) {
      state.jamaahall = payload;
    },
    jamaahbayar(state, payload) {
      state.jamaahbayar = payload;
    },
  },
};
