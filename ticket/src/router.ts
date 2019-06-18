import Vue from "vue"
import Router from "vue-router"
import Ticket from "./views/Ticket.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/ticket",
      name: "Ticket",
      component: () => import("./views/Ticket.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/sampleTicket",
      name: "sample ticket",
      component: () => import("../sample/TradeTicket.vue"),
    },
  ],
})
