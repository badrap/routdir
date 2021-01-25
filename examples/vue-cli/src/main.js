import Vue from "vue";
import VueRouter from "vue-router";
import routdir from "@badrap/routdir";

Vue.use(VueRouter);

const routes = routdir(require.context("./routes", true, /\.vue$/, "lazy"));

new Vue({
  router: new VueRouter({
    mode: "history",
    routes,
  }),
  render(h) {
    return h("router-view", {}, []);
  },
}).$mount("#app");
