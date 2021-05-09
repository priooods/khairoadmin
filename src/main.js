import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/index.js";
import Vuesax from "vuesax";
import VueCookies from "vue-cookies";
import gsap from "gsap";
import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
import iView from "view-design";
import "iview/dist/styles/iview.css";
import Vue2Filters from "vue2-filters";
import VueApexCharts from "vue-apexcharts";
import JsonExcel from "vue-json-excel";
import "./assets/tailwind.css";
import locale from "iview/dist/locale/id-ID";
import VueMoment from "vue-moment";
Vue.use(VueMoment);
Vue.use(iView, { locale });
Vue.component("downloadExcel", JsonExcel);
Vue.use(Vue2Filters);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
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
