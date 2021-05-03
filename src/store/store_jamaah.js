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
        console.log(data.data.data);
        return commit("alljamaah", data.data.data);
      });
    },
    JamaahBelumBayar({ commit }) {
      Jamaah.jamaahbelumbayar().then((data) => {
        return commit("jamaahbayar", data.data.data);
      });
    },
    PesananUpdate({ dispatch },  form) {
      Jamaah.jamaahPesanan(form).then((data) => {
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
    // AllMaskapai({ commit }) {
    //   Umrah.allmaskapai().then((data) => {
    //     return commit("allmaskapai", data.data.data);
    //   });
    // },
    // AddHotel({ commit }, form) {
    //   Umrah.hoteladd(form).then((data) => {
    //     if (data.data.error_code == 0) {
    //       cookies.set("next", 1);
    //       return commit("newhotel", data.data.data);
    //     }
    //     return cookies.set("next", 0);
    //   });
    // },
    // AllHotel({ commit }) {
    //   Umrah.allhotel().then((data) => {
    //     return commit("allhotel", data.data.data);
    //   });
    // },
    // DeleteHotel({ dispatch }, id) {
    //   Umrah.hoteldelete(id).then((data) => {
    //     if (data.data.error_code == 0) {
    //       cookies.set("next", 1);
    //       return dispatch("AllHotel");
    //     }
    //     return cookies.set("next", 0);
    //   });
    // },
    // UpdateHotel({ dispatch }, form) {
    //   Umrah.hotelupdate(form).then((data) => {
    //     if (data.data.error_code == 0) {
    //       cookies.set("next", 1);
    //       return dispatch("AllHotel");
    //     }
    //     return cookies.set("next", 0);
    //   });
    // },
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
    // allmaskapai(state, payload) {
    //   state.maskapaiall = payload;
    // },
    // newumrah(state, payload) {
    //   state.umrahall.push(payload);
    // },
    // allumrah(state, payload) {
    //   state.umrahall = payload;
    // },
  },
};
