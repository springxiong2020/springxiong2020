<template>
  <main
    id="main-content"
    tabindex="-1"
    class="mx-auto flex w-full max-w-7xl flex-1 scroll-mt-20 flex-col px-4 py-8 sm:px-6 lg:px-8"
  >
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedPages" :max="cacheLimit">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<script setup>
import { routes } from "@/router/index.js";

const cachedPages = routes.filter((route) => route.meta?.keepAlive).map((route) => route.name);
const cacheLimit = Math.max(1, cachedPages.length);
</script>
