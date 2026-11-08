<template>
  <header
    class="sticky top-0 z-50 shadow-sm border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo -->
      <a
        href="/"
        class="flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-xl">
          <img
            src="https://img.springxiong.cn/2026/10/089b4349bdb6238e4dc69d54868bc9c8.png"
            alt="avatar"
          />
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-2 md:flex">
        <button
          v-for="item in menus"
          :key="item.path"
          @click="handleClick(item.path)"
          class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          :class="
            route.path === item.path
              ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20 dark:bg-sky-500 dark:text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          "
        >
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </button>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search Button -->
        <button
          class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:flex"
          @click="openSearch"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>搜索</span>
          <kbd
            class="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            Ctrl+K
          </kbd>
        </button>

        <!-- Mobile Menu -->
        <button
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <i
            :class="mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
          ></i>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
      >
        <nav class="flex flex-col gap-2">
          <a
            v-for="item in menus"
            :key="item.path"
            :href="`/#${item.path}`"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </a>

          <button
            class="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
            @click="openSearch"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            <span>搜索点什么...</span>
          </button>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { menus } from "@/router/index.js";

const router = useRouter();
const route = useRoute();

const mobileMenuOpen = ref(false);

// 监听路由变化
watch(
  () => route.path,
  () => {
    const { title } = route.meta;
    const websiteName = import.meta.env.VITE_APP_TITLE;
    document.title = title ? `${title} - ${websiteName}` : websiteName;
    mobileMenuOpen.value = false;
  },
);

const handleClick = (path) => {
  router.push(path);
};

const openSearch = () => {
  window.dispatchEvent(new CustomEvent("global-search-open"));
  mobileMenuOpen.value = false;
};

const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openSearch();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
