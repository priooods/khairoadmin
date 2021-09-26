import Gudang from "../api/Gudang";
export default {
  namespaced: true,
  state: {
    gudang: [],
    belanja: [],
    akuntan: [],
  },
  actions: {
    AddBelanja({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Gudang.addbelanja(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              dispatch("AllGudang");
              return resolve(data);
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    AllBelanja({ commit }, form) {
      return new Promise((resolve, reject) => {
        Gudang.allbelanja(form)
          .then((data) => {
            commit("allbelanja", data.data);
            return resolve(data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    CancelBelanja({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        Gudang.cancelbelanja(id)
          .then((data) => {
            if (data.data.error_code == 0) {
              resolve(data);
              return dispatch("AllGudang");
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    AllGudang({ commit, dispatch }, page) {
      return new Promise((resolve, reject) => {
        Gudang.allgudang(page)
          .then((data) => {
            return dispatch("AllBelanja").finally(() => {
              commit("AllGudang", data.data);
              return resolve(data.data);
            });
          })
          .catch((er) => {
            reject(er);
          });
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
