<template>
  <header
    class="sticky top-0 z-50 shadow-sm border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <router-link
        to="/"
        aria-label="返回首页"
        aria-current-value="page"
        class="flex items-center gap-3 rounded transition-opacity hover:opacity-90"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-xl">
          <img :src="logoUrl" alt="logo" />
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav aria-label="主导航" class="hidden items-center gap-2 md:flex">
        <router-link
          v-for="item in menus"
          :key="item.path"
          :to="item.path"
          aria-current-value="page"
          class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          :class="
            route.path === item.path
              ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-950'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          "
        >
          <i :class="item.meta.icon" aria-hidden="true"></i>
          <span>{{ item.meta.title }}</span>
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search Button -->
        <button
          type="button"
          aria-label="搜索全站内容"
          class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:flex"
          @click="openSearch"
        >
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <kbd
            class="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            Ctrl+K
          </kbd>
        </button>

        <!-- Theme -->
        <button
          type="button"
          :aria-label="themeLabel"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="toggleTheme"
        >
          <i :class="themeIcon" aria-hidden="true"></i>
        </button>

        <!-- 移动端：右上角更多导航操作按钮 -->
        <button
          type="button"
          :aria-label="mobileMenuOpen ? '关闭导航' : '打开导航'"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <i
            :class="mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>

    <!-- 移动端弹窗导航 -->
    <transition name="fade">
      <div
        v-show="mobileMenuOpen"
        id="mobile-navigation"
        class="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
      >
        <nav aria-label="移动导航" class="flex flex-col gap-2">
          <router-link
            v-for="item in menus"
            :key="item.path"
            :to="item.path"
            aria-current-value="page"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="
              route.path === item.path
                ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-950'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
            "
            @click="mobileMenuOpen = false"
          >
            <i :class="item.meta.icon" aria-hidden="true"></i>
            <span>{{ item.meta.title }}</span>
          </router-link>

          <button
            class="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
            @click="openSearch"
          >
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <span>搜索全站内容</span>
          </button>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { menus } from "@/router/index.js";
import { useDarkMode } from "@/composables/useDarkMode";

const logoUrl = import.meta.env.VITE_APP_LOGO_URL;

const { theme, toggleTheme } = useDarkMode();
const themeIcon = computed(
  () =>
    ({
      system: "fa-solid fa-desktop",
      light: "fa-solid fa-sun",
      dark: "fa-solid fa-moon",
    })[theme.value],
);
const themeLabel = computed(() => {
  const labels = { system: "跟随系统", light: "浅色", dark: "深色" };
  const next = { system: "light", light: "dark", dark: "system" };
  return `当前主题：${labels[theme.value]}，点击切换为${labels[next[theme.value]]}`;
});

const route = useRoute();
const mobileMenuOpen = ref(false);

const openSearch = () => {
  window.dispatchEvent(new CustomEvent("global-search-open"));
  mobileMenuOpen.value = false;
};
</script>
