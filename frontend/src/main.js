import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vidle from "v-idle";

Vue.config.productionTip = false;
Vue.use(Vidle);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
