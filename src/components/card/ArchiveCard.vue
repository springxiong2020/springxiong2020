<template>
  <article
    class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 backface-hidden transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
  >
    <div class="space-y-4 p-6">
      <!-- Category badge -->
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
        >
          <i class="fa-solid fa-tag mr-1.5 text-[10px]"></i>
          {{ archive.category }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold leading-snug text-slate-900 dark:text-white">
        {{ archive.title }}
      </h3>

      <!-- Description -->
      <p
        class="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400"
      >
        {{ archive.description }}
      </p>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div class="flex items-center gap-1.5 text-xs text-slate-400">
          <i class="fa-solid fa-cloud"></i>
          <span>网盘资源</span>
        </div>

        <a
          :href="archive.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-600 transition-all hover:bg-sky-100 hover:scale-105 active:scale-95 dark:bg-sky-900/30 dark:text-sky-400 dark:hover:bg-sky-900/50"
        >
          <i class="fa-solid fa-download"></i>
          下载
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  archive: {
    type: Object,
    required: true,
  },
});
</script>
