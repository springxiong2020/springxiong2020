import { nextTick } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/home/index.vue";
import NotFoundPage from "@/views/error/404.vue";
import { routeIcon } from "@/config";

const menus = [
  {
    path: "/blogs",
    name: "BlogPage",
    component: () => import("@/views/blog/index.vue"),
    meta: {
      keepAlive: true,
      title: "技术博客",
      icon: routeIcon.blog,
    },
  },
  {
    path: "/projects",
    name: "ProjectPage",
    component: () => import("@/views/project/index.vue"),
    meta: {
      keepAlive: true,
      title: "开源项目",
      icon: routeIcon.project,
    },
  },
  {
    path: "/books",
    name: "BookPage",
    component: () => import("@/views/book/index.vue"),
    meta: {
      keepAlive: true,
      title: "读书札记",
      icon: routeIcon.book,
    },
  },
  {
    path: "/sentences",
    name: "SentencePage",
    component: () => import("@/views/sentence/index.vue"),
    meta: {
      keepAlive: true,
      title: "三五七言",
      icon: routeIcon.sentence,
    },
  },
  {
    path: "/archives",
    name: "ArchivePage",
    component: () => import("@/views/archive/index.vue"),
    meta: {
      keepAlive: true,
      title: "电子文藏",
      icon: routeIcon.archive,
    },
  },
];

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: { keepAlive: true },
  },

  ...menus,

  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundPage,
    meta: { keepAlive: true },
  },
];

const listPositions = new Map();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  async scrollBehavior(to, from, savedPosition) {
    // 等待缓存页面重新插入 DOM，列表高度恢复后再设置滚动位置。
    await nextTick();
    const position = savedPosition ||
      (to.meta.keepAlive && listPositions.get(to.path)) || { left: 0, top: 0 };
    return { ...position, behavior: "instant" };
  },
});

router.beforeEach((to, from) => {
  if (from.meta.keepAlive) {
    listPositions.set(from.path, { left: window.scrollX, top: window.scrollY });
  }
});

router.afterEach((to, _from, failure) => {
  if (failure) return;
  const websiteName = import.meta.env.VITE_APP_TITLE;
  document.title =
    to.path !== "/" && to.meta.title ? `${to.meta.title} - ${websiteName}` : websiteName;
});

export default router;
export { menus, routes };
