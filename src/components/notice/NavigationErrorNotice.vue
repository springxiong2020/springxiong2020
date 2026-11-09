<template>
  <div role="alert" class="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div
      class="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800 dark:bg-slate-900"
      :aria-busy="retrying"
    >
      <div class="flex items-start gap-3">
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          aria-hidden="true"
        >
          <i class="fa-solid fa-circle-exclamation text-lg" aria-hidden="true"></i>
        </span>
        <div class="min-w-0">
          <h2 class="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
            页面加载失败
          </h2>
          <p class="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            请重试打开页面；若仍无法加载，可刷新页面。
          </p>
        </div>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          :disabled="retrying"
          class="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
          @click="emit('retry')"
        >
          {{ retrying ? "正在重试…" : "重试打开页面" }}
        </button>
        <button
          type="button"
          class="min-h-11 px-3 text-sm text-slate-600 underline-offset-4 hover:text-blue-600 hover:underline dark:text-slate-400 dark:hover:text-blue-300"
          @click="emit('reload')"
        >
          刷新页面
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  retrying: { type: Boolean, default: false },
});
const emit = defineEmits(["retry", "reload"]);
</script>
