<template>
  <article
    class="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 backface-hidden transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
    @click="$emit('click', sentence)"
  >
    <!-- Decorative quote background -->
    <div
      class="absolute -right-6 -top-4 select-none text-[120px] leading-none text-slate-100 dark:text-slate-800/40 font-serif transition-colors group-hover:text-sky-100 dark:group-hover:text-sky-900/30"
    >
      &ldquo;
    </div>

    <div class="relative space-y-5 p-6">
      <!-- Quote content -->
      <blockquote class="min-h-[80px]">
        <p
          class="whitespace-pre-line text-base leading-8 tracking-wide text-slate-700 dark:text-slate-200"
        >
          {{ sentence.content }}
        </p>
      </blockquote>

      <!-- Source info -->
      <div class="flex items-center gap-3">
        <div class="h-0.5 w-8 rounded-full bg-sky-400 dark:bg-sky-500"></div>
        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
          《{{ sentence.title }}》
        </span>
        <span class="text-xs text-slate-400 dark:text-slate-500"
          >{{ sentence.dynasty }} · {{ sentence.author }}
        </span>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div class="flex items-center gap-3">
          <span
            class="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
          >
            {{ dictStore.sentenceCategory[String(sentence.categoryId)] }}
          </span>
          <span
            class="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500"
          >
            <i class="fa-regular fa-clock"></i>
            {{ formatWithoutSeconds(sentence.createdAt) }}
          </span>
        </div>

        <a
          :href="sentence.link"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
          class="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-sky-500 dark:hover:text-sky-400"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          搜索出处
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatWithoutSeconds } from "@/utils/date.js";
import { useDictStore } from "@/stores/dictStore";

const dictStore = useDictStore();

defineProps({
  sentence: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);
</script>
