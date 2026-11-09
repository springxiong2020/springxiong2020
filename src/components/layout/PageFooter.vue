<template>
  <footer class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div
      class="mx-auto grid max-w-7xl items-center gap-1 px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400 sm:gap-4 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:h-16 lg:gap-6 lg:px-8 lg:py-0 lg:text-left"
    >
      <p class="leading-relaxed">&copy; {{ currentYear }} {{ brand.name }}</p>

      <nav
        aria-label="个人链接"
        class="flex-wrap items-center justify-center gap-x-6 hidden sm:flex"
      >
        <a
          v-for="link in personalLinks"
          :key="link.name"
          :href="link.href"
          :title="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link gap-1.5"
        >
          <i :class="link.icon" aria-hidden="true"></i>
          {{ link.name }}
        </a>
      </nav>

      <a
        href="https://beian.miit.gov.cn/"
        title="备案信息"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link justify-self-center lg:justify-self-end"
      >
        {{ brand.icp }}
      </a>
    </div>
  </footer>
</template>

<script setup>
import { personalLinks } from "@/config.js";

const DEFAULT_BRAND = {
  name: "SpringXiong",
  icp: "黔ICP备2026000823号-2",
};
const BRANDS = {
  "springbear.cn": {
    name: "SpringBear",
    icp: "黔ICP备2026000823号-1",
  },
  "springxiong.cn": DEFAULT_BRAND,
};

const hostname = window.location.hostname.toLowerCase();
const brand = Object.hasOwn(BRANDS, hostname) ? BRANDS[hostname] : DEFAULT_BRAND;
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-link {
  @apply inline-flex min-h-11 items-center justify-center py-2 underline-offset-4 transition-colors hover:text-blue-600 hover:underline focus-visible:text-blue-600 motion-reduce:transition-none dark:hover:text-blue-300 dark:focus-visible:text-blue-300;
}
</style>
