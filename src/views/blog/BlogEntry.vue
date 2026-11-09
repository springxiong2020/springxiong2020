<template>
  <article>
    <a
      :href="article.link"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-4 rounded-lg px-2 py-5 transition-colors hover:bg-white focus-visible:bg-white motion-reduce:transition-none sm:gap-5 sm:px-4 dark:hover:bg-slate-900 dark:focus-visible:bg-slate-900"
    >
      <div
        class="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-28 dark:bg-slate-800"
      >
        <img
          v-if="article.cover && !coverBroken"
          :src="article.cover"
          alt="book cover"
          loading="lazy"
          class="size-full object-cover"
          @error="coverBroken = true"
        />
        <i
          v-else
          class="fa-solid fa-file-lines text-xl text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        ></i>
      </div>
      <div class="min-w-0 flex-1">
        <h2
          class="break-words text-base font-semibold leading-7 text-slate-900 transition-colors group-hover:text-blue-600 group-focus-visible:text-blue-600 sm:text-lg dark:text-slate-100 dark:group-hover:text-blue-300 dark:group-focus-visible:text-blue-300"
        >
          {{ article.title }}
        </h2>
        <div
          class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5 text-slate-500 dark:text-slate-400"
        >
          <time v-if="article.date" :datetime="article.date">{{ article.date }}</time>
          <span v-if="article.category">{{ article.categoryLabel }}</span>
          <span class="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">{{
            article.tag
          }}</span>
        </div>
        <span
          class="mt-2 inline-flex items-center gap-1.5 text-xs leading-5 text-slate-400 dark:text-slate-500"
        >
          在 CSDN 中阅读原文
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
          <span class="sr-only">（在新窗口打开阅读）</span>
        </span>
      </div>
      <i
        class="fa-solid fa-chevron-right hidden text-xs text-slate-300 transition-colors group-hover:text-blue-600 sm:block dark:text-slate-600 dark:group-hover:text-blue-300"
        aria-hidden="true"
      ></i>
    </a>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDictStore } from "@/stores/dictStore";
import { formatDate } from "@/utils/date.js";

const props = defineProps({ article: { type: Object, required: true } });

const dictStore = useDictStore();
const coverBroken = ref(false);
const article = computed(() => {
  const category = props.article.categoryId == null ? "" : String(props.article.categoryId);
  return {
    ...props.article,
    date: formatDate(props.article.postTime),
    category,
    categoryLabel: dictStore.blogCategory[category] || "未分类",
    tag: dictStore.blogTag[String(props.article.tagId)] || "未标记",
  };
});
</script>
