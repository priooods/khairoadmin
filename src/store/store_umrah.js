import Umrah from "../api/Umrah";
export default {
  namespaced: true,
  state: {
    hotelall: [],
    umrahall: [],
  },
  actions: {
    AddHotel({ commit }, form) {
      Umrah.hoteladd(form).then((data) => {
        console.log(data.data);
        return commit("newhotel", data.data.data);
      });
    },
  },
  mutations: {
    newhotel(state, payload) {
      state.hotelall.push(payload);
    },
    allhotel(state, payload) {
      state.umrahall = payload;
    },
  },
};
