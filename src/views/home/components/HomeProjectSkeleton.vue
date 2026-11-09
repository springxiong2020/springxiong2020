<template>
  <div class="grid gap-5 md:grid-cols-3 md:gap-6">
    <div
      v-for="n in 3"
      :key="n"
      class="min-h-96 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700"
    >
      <div class="flex h-36 items-center justify-center bg-blue-50 sm:h-40 dark:bg-slate-800">
        <div class="size-20 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
      </div>
      <div class="min-w-0 flex-1 space-y-3 p-5 sm:p-4 lg:p-6">
        <div class="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="space-y-2 pt-2">
          <div class="h-3 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
          <div class="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  </div>
</template>
