<template>
  <a
    :href="book.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 backface-hidden transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
  >
    <!-- Cover -->
    <div
      class="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800"
    >
      <img
        :src="book.cover"
        :alt="book.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
      ></div>

      <div class="absolute bottom-3 left-3 right-3">
        <div
          class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <i class="fa-solid fa-book-open mr-1"></i>
          已读 {{ formatReadMinute(book.readMinute) }}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-4 p-5">
      <div>
        <h3
          class="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white"
        >
          {{ book.title }}
        </h3>

        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ book.author }}
        </p>
      </div>

      <!-- Quote -->
      <blockquote
        class="relative rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300"
      >
        <i
          class="fa-solid fa-quote-left absolute left-3 top-3 text-xs opacity-20"
        ></i>

        <p class="pl-4 line-clamp-3">
          {{ book.iconicQuote }}
        </p>
      </blockquote>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
      >
        <span>首次读完</span>
        <span>{{ formatDate(book.firstCompletion) }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import { formatDate } from "@/utils/date.js";

defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const formatReadMinute = (minute) => {
  const hours = Math.floor(minute / 60);
  if (hours < 1) return `${minute} 分钟`;

  const minutes = minute % 60;
  return minutes === 0 ? `${hours} 小时` : `${hours} 小时 ${minutes} 分钟`;
};
</script>
