<template>
  <div
    class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="space-y-5 p-6">
      <!-- Quote skeleton -->
      <div class="space-y-3">
        <div
          class="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800"
        ></div>
        <div
          class="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
        ></div>
        <div
          class="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
        ></div>
      </div>

      <!-- Divider + source skeleton -->
      <div class="flex items-center gap-3">
        <div
          class="h-0.5 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"
        ></div>
        <div
          class="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
        ></div>
      </div>

      <!-- Footer skeleton -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div
          class="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"
        ></div>
        <div
          class="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
        ></div>
      </div>
    </div>
  </div>
</template>
