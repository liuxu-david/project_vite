import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "首页",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/table",
    name: "桌子",
    component: () => import("../views/table/index.vue"),
  },
  {
    path: "/foods",
    name: "点餐",
    component: () => import("../views/foods/index.vue"),
  },
  {
    path: "/list",
    name: "虚拟列表",
    component: () => import("../views/list/index.vue"),
  },
  {
    path: "/refresh",
    name: "触底刷新页面",
    component: () => import("../views/refresh/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
