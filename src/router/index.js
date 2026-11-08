import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/index.vue";

const menus = [
  {
    path: "/blogs",
    name: "Blog",
    component: () => import("@/views/blog/index.vue"),
    meta: {
      title: "技术博客",
      icon: "fa-solid fa-code",
    },
  },
  {
    path: "/projects",
    name: "Project",
    component: () => import("@/views/project/index.vue"),
    meta: {
      title: "开源项目",
      icon: "fa-brands fa-github",
    },
  },
  {
    path: "/books",
    name: "Book",
    component: () => import("@/views/book/index.vue"),
    meta: {
      title: "读书札记",
      icon: "fa-solid fa-book-open",
    },
  },
  {
    path: "/sentences",
    name: "Sentence",
    component: () => import("@/views/sentence/index.vue"),
    meta: {
      title: "三五七言",
      icon: "fa-solid fa-feather",
    },
  },
  {
    path: "/archives",
    name: "Archive",
    component: () => import("@/views/archive/index.vue"),
    meta: {
      title: "电子文藏",
      icon: "fa-solid fa-archive",
    },
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  ...menus,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
export { menus };
