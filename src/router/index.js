import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import FilmDetail from "../components/FilmDetail.vue";
import Explore from "../components/Explore.vue";
import Favouries from "../components/Favourites.vue";
import Discovery from "../components/Discovery.vue";
import Register from "../components/Login/Register.vue";
import Login from "../components/Login/Login.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: Home,
      component: Home,
    },
    {
      path: "/film/:id",
      name: FilmDetail,
      component: FilmDetail,
    },
    {
      path: "/explore",
      name: Explore,
      component: Explore,
    },
    {
      path: "/favouries",
      name: Favouries,
      component: Favouries,
    },
    {
      path: "/discovery",
      name: Discovery,
      component: Discovery,
    },
    {
      path: "/register",
      name: Register,
      component: Register,
    },
    {
      path: "/login",
      name: Login,
      component: Login,
    },
  ],
});
