import Vue from "vue";
import VueRouter from "vue-router";
import mainPage from "../../views/mainPage.vue";
import userPage from "../../views/userPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-page",
    component: mainPage,
  },
  {
    path: "/user/:userId",
    name: "user-page",
    component: userPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
