import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'bus-routes',
    component: Main
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
