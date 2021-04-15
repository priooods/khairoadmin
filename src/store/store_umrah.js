import Umrah from "../api/Umrah";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    hotelall: [],
    umrahall: [],
  },
  actions: {
    AddHotel({ commit }, form) {
      Umrah.hoteladd(form).then((data) => {
        console.log(data);
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return commit("newhotel", data.data.data);
        }
        return cookies.set("next", 0);
      });
    },
    AllHotel({ commit }) {
      Umrah.allhotel().then((data) => {
        console.log(data);
        return commit("allhotel", data.data.data);
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
  },
};
