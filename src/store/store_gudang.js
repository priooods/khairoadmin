import Gudang from "../api/Gudang";
export default {
  namespaced: true,
  state: {
    gudang: [],
    belanja: [],
  },
  actions: {
    AddBelanja({ dispatch }, form) {
      Gudang.addbelanja(form).then(() => {
        return dispatch("AllBelanja");
      });
    },
    AllBelanja({ commit }) {
      Gudang.allbelanja().then((data) => {
        return commit("allbelanja", data.data.data);
      });
    },
    CancelBelanja({ commit }, id) {
      Gudang.cancelbelanja(id).then(() => {
        return commit("cancelbelanja", id);
      });
    },
  },
  mutations: {
    allbelanja(state, payload) {
      state.belanja = payload;
    },
    cancelbelanja(state, payload) {
      var ind = state.belanja.filter((es) => es.id === payload.id);
      state.belanja.splice(ind, 1);
    },
  },
};
