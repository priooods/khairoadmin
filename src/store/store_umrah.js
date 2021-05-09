import Umrah from "../api/Umrah";
import cookies from "vue-cookies";
export default {
  namespaced: true,
  state: {
    umrahall: [],
  },
  actions: {
    AddUmrah({ dispatch }, form) {
      Umrah.umrahadd(form).then((data) => {
        console.log(data.data);
        if (data.data.error_code == 0) {
          dispatch("AllUmrah");
          return cookies.set("next", 1);
        }
        return cookies.set("next", 0);
      });
    },
    AllUmrah({ commit }) {
      Umrah.allpaket().then((data) => {
        return commit("allumrah", data.data.data);
      });
    },
    UpdateUmrah({ dispatch }, form) {
      Umrah.umrahupdate(form).then((data) => {
        console.log(data.data);
        if (data.data.error_code == 0) {
          cookies.set("next", 1);
          return dispatch("AllUmrah");
        }
        return cookies.set("next", 0);
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
