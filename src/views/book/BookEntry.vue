<template>
  <article
    class="book-entry flex min-w-0 flex-col overflow-hidden rounded-r-2xl rounded-l-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img
        :src="book.cover"
        :alt="`${book.title}书封`"
        loading="lazy"
        class="size-full object-cover"
      />
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 via-black/5 to-transparent"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden="true"
      ></div>
      <span
        class="absolute bottom-3 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium leading-5 text-slate-700 shadow-sm"
      >
        <i class="fa-solid fa-book-open text-xs" aria-hidden="true"></i>
        {{ readDuration === "暂无记录" ? "阅读时长待记录" : `已读 ${readDuration}` }}
      </span>
    </div>

    <div class="flex flex-1 flex-col px-5 pb-4 pt-5">
      <header>
        <h2 class="break-words text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100">
          {{ book.title }}
        </h2>
        <p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {{ book.author || "作者待补充" }}
        </p>
      </header>

      <blockquote
        v-if="book.iconicQuote"
        class="relative my-5 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
      >
        <span
          class="pointer-events-none absolute left-3 top-2 font-serif text-2xl leading-none text-blue-200 dark:text-blue-800"
          aria-hidden="true"
          >“</span
        >
        <p
          class="relative whitespace-pre-wrap break-words pl-2 font-serif text-sm leading-7 text-slate-600 dark:text-slate-300"
        >
          {{ book.iconicQuote }}
        </p>
      </blockquote>
      <p v-else class="my-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
        这本书还没有摘录
      </p>

      <footer class="mt-auto border-t border-slate-100 pt-3 dark:border-slate-800">
        <div
          class="flex flex-wrap items-center justify-between gap-2 text-xs leading-6 text-slate-500 dark:text-slate-400"
        >
          <span>{{ completionDate ? "首次读完" : "阅读进度" }}</span>
          <time v-if="completionDate" :datetime="completionDate">{{ completionDate }}</time>
          <span v-else>尚未读完</span>
        </div>
        <a
          v-if="book.link"
          :href="book.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-1 inline-flex min-h-11 items-center gap-2 rounded text-xs text-slate-500 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-slate-400 dark:hover:text-blue-300"
          :aria-label="`前往豆瓣查看《${book.title}》（在新窗口打开）`"
          >前往豆瓣读书查看<i
            class="fa-solid fa-arrow-up-right-from-square text-xs"
            aria-hidden="true"
          ></i
        ></a>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { formatDate } from "@/utils/date.js";

const props = defineProps({ book: { type: Object, required: true } });

const completionDate = computed(() => formatDate(props.book.firstCompletion));
const readDuration = computed(() => {
  const value = props.book.readMinute;
  if (value == null || value === "" || !Number.isFinite(Number(value)) || Number(value) < 0)
    return "暂无记录";
  const minutes = Math.floor(Number(value));
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} 小时${minutes % 60 ? ` ${minutes % 60} 分钟` : ""}` : `${minutes} 分钟`;
});
</script>
