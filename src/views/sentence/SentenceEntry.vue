<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white px-5 py-7 sm:px-10 sm:py-9 dark:border-slate-800 dark:bg-slate-900"
  >
    <h2 class="font-serif text-xl font-semibold leading-relaxed text-slate-900 dark:text-white">
      {{ sentence.title || "无题" }}
    </h2>
    <div
      class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400"
    >
      <span v-if="sentence.dynasty">{{ sentence.dynasty }}</span
      ><span v-if="sentence.author">{{ sentence.author }}</span>
      <span
        v-if="categoryName"
        class="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        >{{ categoryName }}</span
      >
    </div>
    <blockquote class="mb-4 mt-7 max-w-prose">
      <p
        class="line-clamp-2 whitespace-pre-wrap break-words font-serif text-base leading-10 tracking-wide text-slate-700 sm:text-lg dark:text-slate-200"
      >
        {{ sentence.content }}
      </p>
    </blockquote>
    <div class="flex items-center">
      <button
        type="button"
        class="inline-flex min-h-11 items-center gap-2 rounded text-sm text-slate-500 underline-offset-4 transition-colors hover:text-blue-600 hover:underline motion-reduce:transition-none dark:text-slate-400 dark:hover:text-blue-300"
        aria-haspopup="dialog"
        :aria-label="`阅读《${sentence.title || '无题'}》详情`"
        @click="emit('read', sentence, $event)"
      >
        详情阅读
        <i class="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useDictStore } from "@/stores/dictStore";

const props = defineProps({ sentence: { type: Object, required: true } });
const emit = defineEmits(["read"]);

const dictStore = useDictStore();
const categoryName = computed(() => {
  const key = props.sentence.categoryId == null ? "" : String(props.sentence.categoryId);
  return dictStore.sentenceCategory[key] || (key ? "未分类" : "");
});
</script>
