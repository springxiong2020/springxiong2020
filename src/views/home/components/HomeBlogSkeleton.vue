<template>
  <div class="grid gap-x-12 md:grid-cols-2">
    <div
      v-for="n in 4"
      :key="n"
      class="flex min-h-28 items-center gap-3.5 border-b border-slate-200 py-5 sm:min-h-32 sm:gap-5 sm:py-6 md:gap-3.5 lg:gap-5 dark:border-slate-700"
    >
      <div
        class="h-[60px] w-[90px] shrink-0 rounded-lg bg-slate-200 sm:h-20 sm:w-[120px] md:h-16 md:w-24 lg:h-20 lg:w-[120px] dark:bg-slate-700"
      ></div>
      <div class="min-w-0 flex-1 space-y-3">
        <div class="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  </div>
</template>
