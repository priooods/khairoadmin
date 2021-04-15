import Gudang from "../api/Gudang";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    gudang: [],
    belanja: [],
  },
  actions: {
    AddBelanja({ dispatch }, form) {
      Gudang.addbelanja(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set('next', 1);
          return dispatch("AllBelanja");
        }
        return cookies.set("next", 0);
      });
    },
    AllBelanja({ commit }) {
      Gudang.allbelanja().then((data) => {
        return commit("allbelanja", data.data.data);
      });
    },
    CancelBelanja({ dispatch }, id) {
      Gudang.cancelbelanja(id).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set('next', 1);
          return dispatch("AllBelanja");
        }
        return cookies.set("next", 0);
      });
    },
  },
  mutations: {
    allbelanja(state, payload) {
      state.belanja = payload;
    },
    // cancelbelanja(state, payload) {
    //   var ind = state.belanja.filter((es) => es.id === payload.id);
    //   state.belanja.splice(ind, 1);
    // },
  },
};
