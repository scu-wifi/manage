import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import Table from "@/views/Table.vue";
import Main from "@/views/Main.vue";
import Feed from "@/views/Feed.vue";
import Equipment from "@/views/Equipment.vue";
import Person from "@/views/Person.vue";
import PersonManage from "@/views/PersonManage.vue";
import EqLog from "@/views/EqLog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    name: Login,
    component: Login,
  },
  {
    path: "/home",
    name: Home,
    component: Home,
    children: [
      {
        path: "/",
        component: Main,
      },
      {
        path: "/main",
        component: Main,
      },
      {
        path: "/table",
        name: "table",
        component: Table,
      },
      {
        path: "/feed",
        component: Feed,
      },
      {
        path: "/equipment",
        component: Equipment,
      },
      {
        path: "/person",
        component: Person,
      },
      {
        path: "/pmanage",
        component: PersonManage,
      },
      {
        path: "/eqlog",
        component: EqLog,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
