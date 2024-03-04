import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/main";
import RoutesTable from "@/views/sidebar/RoutesTable";
import StopsTable from "@/views/sidebar/StopsTable";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'bus-routes',
    component: Main,
    redirect: {
      name: "routes"
    },
    children: [
      {
        path: "routes",
        name: "routes",
        components: {sidebarView: RoutesTable}
      },
      {
        path: "stops",
        name: "stops",
        components: {sidebarView: StopsTable}
      },
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
