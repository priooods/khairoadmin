import Jamaah from "../api/Jamaah";
// import cookies from "vue-cookies";
// import iView from "iview";
export default {
  namespaced: true,
  state: {
    jamaahall: [],
    jamaahbayar: [],
  },
  actions: {
    AddJamaah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.addjamaah(form)
          .then((data) => {
            resolve(data);
            if (data.data.error_code == 0) {
              return dispatch("Alljamaah");
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    Alljamaah({ commit }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.alljamaah(form)
          .then((data) => {
            resolve(data);
            console.log(data, "jamaah");
            return commit("alljamaah", data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    Searchjamaah({ commit }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.Searchjamaah(form)
          .then((data) => {
            resolve(data);
            return commit("alljamaah", data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    JamaahBelumBayar({ commit }) {
      return new Promise((resolve, reject) => {
        Jamaah.jamaahbelumbayar()
          .then((data) => {
            resolve(data);
            return commit("jamaahbayar", data.data.data);
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    PesananUpdate({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.pesananupdate(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              resolve(data);
              return dispatch("Alljamaah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    BayarJamaah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.jamaahbayar(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              resolve(data);
              return dispatch("Alljamaah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    HapusJamaah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.jamaahhapus(form)
          .then((data) => {
            if (data.data.error_code == 0) {
              resolve(data);
              return dispatch("Alljamaah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    UpdateJamaah({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        Jamaah.jamaahupdate(form)
          .then((data) => {
            console.log(data.data);
            if (data.data.error_code == 0) {
              resolve(data);
              return dispatch("Alljamaah", { page: 1 });
            }
          })
          .catch((er) => {
            reject(er);
          });
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
