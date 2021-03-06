// Import
import Vue from "vue";
import App from "./App.vue";
import VueMeta from "vue-meta";
import Notifications from "vue-notification";
import router from "./router";
import i18n from "./locales";
import store from "./store";
import functions from "./functions/general";
import axios from "axios";

// Register layouts
const authLayout = () => import("./layouts/auth");
const adminLayout = () => import("./layouts/admin");
Vue.component("authLayout", authLayout);
Vue.component("adminLayout", adminLayout);

// Config
Vue.config.productionTip = false;
Vue.prototype.$backendUrl = process.env.VUE_APP_BACKEND_URL;
Vue.prototype.$appName = process.env.VUE_APP_NAME;

Vue.mixin(functions);
Vue.use(Notifications);
Vue.use(VueMeta);

if (store.getters.getLoggedUser) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getters.getLoggedUser.token;
}
Vue.prototype.$http = axios;

// Start Vue Js
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
