import Umrah from "../api/Umrah";
export default {
  namespaced: true,
  state: {
    umrahall: [],
  },
  actions: {
    AddUmrah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Umrah.umrahadd(form)
          .then((data) => {
            resolve(data);
            if (data.data.error_code == 0) {
              return dispatch("AllUmrah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    AllUmrah({ commit }, params) {
      return new Promise((resolve, reject) => {
        Umrah.allpaket(params)
          .then((data) => {
            resolve(data);
            return commit("allumrah", data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    Searching({ commit }) {
      return new Promise((resolve, reject) => {
        Umrah.search()
          .then((data) => {
            resolve(data);
            return commit("allumrah", data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    UpdateUmrah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Umrah.umrahupdate(form)
          .then((data) => {
            resolve(data);
            if (data.data.error_code == 0) {
              return dispatch("AllUmrah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
  },
  mutations: {
    newumrah(state, payload) {
      state.umrahall.push(payload);
    },
    allumrah(state, payload) {
      state.umrahall = payload;
    },
  },
};
