import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import "tracking/build/tracking-min.js";
import "tracking/build/data/face-min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-material-design-icons/styles.css";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
