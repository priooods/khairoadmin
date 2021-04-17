import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/index.js";
import Vuesax from "vuesax";
import VueCookies from "vue-cookies";
import gsap from "gsap";
import "vuesax/dist/vuesax.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "boxicons/css/boxicons.min.css";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import Vue2Filters from "vue2-filters";
import VueApexCharts from "vue-apexcharts";
import moment from "vue-moment";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
Vue.use(Vue2Filters);
Vue.use(VueApexCharts);
Vue.use(moment);
Vue.component("apexchart", VueApexCharts);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(Vuesax);
Vue.use(gsap);
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
