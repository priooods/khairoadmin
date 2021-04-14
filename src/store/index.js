import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import operat from "./store_operator";
import mitra from "./store.mitra";
import gudang from "./store_gudang";
import umrah from "./store_umrah";
Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: { mitra, operat, gudang, umrah },
});
