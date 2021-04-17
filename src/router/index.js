import Vue from "vue";
import VueRouter from "vue-router";
import Base from "../views/Base.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Access from "../views/Access.vue";
import Gudang from "../views/Gudang.vue";
import Cabang from "../views/Cabang.vue";
import Mitra from "../views/Mitra.vue";
import Umrah from "../views/Umrah.vue";
import Jamaah from "../views/Jamaah.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/base",
    name: "Base",
    component: Base,
    children: [
      {
        path: "/base/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/base/access",
        name: "Access",
        component: Access,
      },
      {
        path: "/base/gudang",
        name: "Gudang",
        component: Gudang,
      },
      {
        path: "/base/mitra",
        name: "Mitra",
        component: Mitra,
      },
      {
        path: "/base/cabang",
        name: "Cabang",
        component: Cabang,
      },
      {
        path: "/base/umrah",
        name: "Umrah",
        component: Umrah,
      },
      {
        path: "/base/jamaah",
        name: "Jamaah",
        component: Jamaah,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
