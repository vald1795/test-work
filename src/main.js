import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/routes/routes";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./plugins/validate/validate";
import "./assets/styles/main.css";

Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
