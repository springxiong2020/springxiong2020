<template>
  <section
    class="flex w-full flex-1 items-center justify-center py-8 sm:py-12"
    aria-labelledby="not-found-title"
  >
    <div class="w-full max-w-xl text-center">
      <div
        class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl dark:bg-slate-800"
        aria-hidden="true"
      >
        🐻
      </div>
      <p class="mt-6 text-sm text-slate-500 dark:text-slate-400">
        <span class="font-mono font-medium text-blue-600 dark:text-blue-300">404</span>
        <span class="mx-2" aria-hidden="true">·</span>
        NOT FOUND
      </p>
      <h1
        id="not-found-title"
        class="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100"
      >
        糟糕，这里是荒原
      </h1>
      <p class="mt-4 text-base leading-8 text-slate-500 dark:text-slate-400">
        春天熊似乎还没把这块星图构建出来，或者页面已经迁徙到了远方。
      </p>
      <div
        class="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
      >
        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300"
        >
          <i class="fa-solid fa-house-chimney" aria-hidden="true"></i>
          返回首页
        </router-link>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="router.back()"
        >
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          返回上页
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

defineOptions({ name: "NotFoundPage" });
const router = useRouter();
</script>
