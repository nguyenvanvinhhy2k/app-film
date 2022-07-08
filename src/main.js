import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import api from "./services/api";
import VueSlickCarousel from "vue-slick-carousel";
import VueCarousel from "vue-carousel";
import Toasted from "vue-toasted";
import { debounce } from "debounce";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSkeletonLoader from 'skeleton-loader-vue';


import {
  faUserSecret,
  faHouseChimney,
  faTv,
  faCompass,
  faClockRotateLeft,
  faRightToBracket,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faStar,
  faCalendarDays,
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faUpRightFromSquare,
  faHeart,
  faCirclePlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faHouseChimney,
  faTv,
  faCompass,
  faClockRotateLeft,
  faRightToBracket,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faStar,
  faCalendarDays,
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faHeart,
  faUpRightFromSquare,
  faCirclePlay,
  faXmark
);

Vue.use(Toasted);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.$http = api;
Vue.config.productionTip = false;
Vue.use(debounce);
Vue.use(VueCarousel);
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

new Vue({
  router,
  store,
  VueSlickCarousel,
  render: (h) => h(App),
}).$mount("#app");
