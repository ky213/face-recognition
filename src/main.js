import Vue from "vue";
import iview from "iview";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import "tracking/build/tracking-min.js";
import "tracking/build/data/face-min.js";
import "vue-material-design-icons/styles.css";
import "iview/dist/styles/iview.css";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(iview);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
