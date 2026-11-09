<template>
  <div
    class="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900"
    aria-hidden="true"
  >
    <div class="mb-6 flex items-start justify-between gap-4">
      <div class="size-16 rounded-xl bg-slate-200 sm:size-20 dark:bg-slate-800"></div>
      <div class="mt-1 h-4 w-16 rounded bg-slate-100 dark:bg-slate-800"></div>
    </div>

    <div class="h-8 w-2/3 rounded bg-slate-200 dark:bg-slate-800"></div>
    <div class="mt-2 h-5 w-1/3 rounded bg-slate-100 dark:bg-slate-800"></div>
    <div class="mt-4 space-y-3">
      <div class="h-4 w-full rounded bg-slate-100 dark:bg-slate-800"></div>
      <div class="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800"></div>
      <div class="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800"></div>
    </div>
    <div class="mt-5 flex flex-wrap gap-2">
      <div v-for="n in 3" :key="n" class="h-6 w-16 rounded bg-slate-100 dark:bg-slate-800"></div>
    </div>

    <div class="mt-auto pt-6">
      <div
        class="flex min-h-14 items-center justify-between gap-4 border-t border-slate-100 pt-3 dark:border-slate-800"
      >
        <div class="h-4 w-28 rounded bg-slate-100 dark:bg-slate-800"></div>
        <div class="h-5 w-20 rounded bg-slate-100 dark:bg-slate-800"></div>
      </div>
    </div>
  </div>
</template>
