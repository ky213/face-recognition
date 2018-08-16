import Vue from "vue";
import Router from "vue-router";
import Camera from "./views/Camera.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "camera",
      component: Camera
    },
    {
      path: "/file",
      name: "file",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/File.vue")
    }
  ]
});
