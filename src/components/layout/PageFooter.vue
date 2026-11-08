<template>
  <footer
    class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 md:px-8"
    >
      <div class="flex flex-col items-center gap-1">
        <p>
          &copy; 2020-{{ currentYear }} {{ brand.name }}. All rights reserved.
        </p>
      </div>
      <div class="flex flex-col items-center gap-2">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-slate-900 dark:hover:text-white"
        >
          {{ brand.icp }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const BRANDS = {
  "springbear.cn": {
    name: "SpringBear",
    icp: "黔ICP备2026000823号-1",
  },
  "springxiong.cn": {
    name: "SpringXiong",
    icp: "黔ICP备2026000823号-2",
  },
  localhost: {
    name: "SpringXiong",
    icp: "黔ICP备2026000823号-2",
  },
  "127.0.0.1": {
    name: "SpringXiong",
    icp: "黔ICP备2026000823号-2",
  },
};

const hostname = window.location.hostname.toLowerCase();
const brand = BRANDS[hostname];
const currentYear = new Date().getFullYear();
</script>
