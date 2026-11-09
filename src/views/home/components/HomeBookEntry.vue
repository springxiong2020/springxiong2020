<template>
  <article class="relative flex items-start gap-4 sm:gap-6">
    <i
      class="fa-solid fa-book-open pointer-events-none absolute -top-1 right-0 home-reading-mark text-5xl"
      aria-hidden="true"
    ></i>
    <a
      :href="book.link"
      target="_blank"
      rel="noopener noreferrer"
      class="relative drop-shadow-md rounded text-sm font-medium text-blue-600 dark:text-blue-300 underline-offset-4 hover:underline shrink-0"
      :aria-label="`在豆瓣查看《${book.title}》`"
    >
      <img
        v-if="book.cover && !coverBroken"
        :src="book.cover"
        :alt="book.title"
        width="100"
        height="140"
        class="h-[118px] w-20 rounded object-contain sm:h-40 sm:w-28"
        @error="coverBroken = true"
      />
      <span
        v-else
        class="flex h-[118px] w-20 sm:h-40 sm:w-28 items-center justify-center rounded bg-slate-100 text-2xl text-slate-400 dark:bg-slate-800"
        aria-hidden="true"
        ><i :class="routeIcon.book"></i
      ></span>
    </a>
    <div class="min-w-0 flex-1">
      <h3 class="pr-14 line-clamp-2 text-lg font-semibold leading-7 [overflow-wrap:anywhere]">
        <a
          :href="book.link"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded text-lg leading-relaxed hover:text-blue-600 dark:hover:text-blue-300"
          >{{ book.title }}</a
        >
      </h3>
      <p class="mt-1 pr-14 truncate text-sm home-muted">
        {{ book.author }}
      </p>
      <p class="mt-2 text-xs home-muted">读完于 {{ displayDate(book.firstCompletion) }}</p>
      <blockquote
        v-if="book.iconicQuote"
        class="font-serif mt-4 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300"
      >
        {{ book.iconicQuote }}
      </blockquote>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { routeIcon } from "@/config.js";
import { formatDate } from "@/utils/date.js";

defineProps({ book: { type: Object, required: true } });

const coverBroken = ref(false);
const displayDate = (value) => formatDate(value);
</script>
