import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import Weight from "@/views/Weight.vue";
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
    name: 'Login',
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
        name: "育肥监控",
        component: Weight,
      },
      {
        path: "/feed",
        component: Feed,
      },
      {
        path: "/equipment",
        name: '设备管理',
        component: Equipment,
      },
      {
        path: "/person",
        name: '个人主页',
        component: Person,
      },
      {
        path: "/pmanage",
        name: '授权管理',
        component: PersonManage,
      },
      {
        path: "/eqlog",
        name: '设备日志',
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
