import Umrah from "../api/Umrah";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    hotelall: [],
    umrahall: [],
    maskapaiall: [],
  },
  actions: {
    AddUmrah({ commit }, form) {
      Umrah.umrahadd(form).then((data) => {
        console.log(data);
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("newumrah", data.data.data);
        }
        return cookies.set("next", 0);
      });
    },
    AllUmrah({ commit }) {
      Umrah.allpaket().then((data) => {
        return commit("allumrah", data.data.data);
      });
    },
    AddMaskapai({ commit }, form) {
      Umrah.maskapaiadd(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("newmaskapai", data.data.data);
        }
        return cookies.set("next", 0);
      });
    },
    AllMaskapai({ commit }) {
      Umrah.allmaskapai().then((data) => {
        return commit("allmaskapai", data.data.data);
      });
    },
    AddHotel({ commit }, form) {
      Umrah.hoteladd(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("newhotel", data.data.data);
        }
        return cookies.set("next", 0);
      });
    },
    AllHotel({ commit }) {
      Umrah.allhotel().then((data) => {
        return commit("allhotel", data.data.data);
      });
    },
    DeleteHotel({ dispatch }, id) {
      Umrah.hoteldelete(id).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllHotel");
        }
        return cookies.set("next", 0);
      });
    },
    UpdateHotel({ dispatch }, form) {
      Umrah.hotelupdate(form).then((data) => {
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllHotel");
        }
        return cookies.set("next", 0);
      });
    },
  },
  mutations: {
    newhotel(state, payload) {
      state.hotelall.push(payload);
    },
    allhotel(state, payload) {
      state.hotelall = payload;
    },
    newmaskapai(state, payload) {
      state.maskapaiall.push(payload);
    },
    allmaskapai(state, payload) {
      state.maskapaiall = payload;
    },
    newumrah(state, payload) {
      state.umrahall.push(payload);
    },
    allumrah(state, payload) {
      state.umrahall = payload;
    },
  },
};
