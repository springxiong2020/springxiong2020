<template>
  <article
    class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900"
  >
    <div
      class="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 sm:size-11 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      aria-hidden="true"
    >
      <i class="fa-solid fa-archive text-lg"></i>
    </div>

    <header class="min-w-0 self-center">
      <h2
        class="break-words text-base font-semibold leading-7 text-slate-900 sm:text-lg dark:text-slate-100"
      >
        {{ archive.title }}
      </h2>
      <p v-if="archive.category" class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {{ archive.category }}
      </p>
    </header>

    <div class="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-2">
      <p
        v-if="archive.description"
        class="whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300"
      >
        {{ archive.description }}
      </p>
      <p v-else class="text-xs leading-6 text-slate-500 dark:text-slate-400">暂无资源描述</p>
    </div>

    <div
      class="col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:col-span-1 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:flex-col sm:items-end sm:justify-start sm:gap-1 sm:border-0 sm:pl-6 sm:pt-0 dark:border-slate-800"
    >
      <a
        v-if="archive.link"
        :href="archive.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-blue-700 underline-offset-4 transition-colors hover:bg-blue-50 hover:underline motion-reduce:transition-none dark:text-blue-300 dark:hover:bg-blue-950"
        :aria-label="`前往百度网盘查看${archive.title}（在新窗口打开）`"
      >
        获取百度网盘资源
        <i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i>
      </a>
      <span v-else class="py-3 text-xs text-slate-500 dark:text-slate-400">资源链接待补充</span>
    </div>
  </article>
</template>

<script setup>
defineProps({ archive: { type: Object, required: true } });
</script>
