import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
