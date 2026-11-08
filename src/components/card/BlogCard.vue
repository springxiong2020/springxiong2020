<template>
  <a
    :href="blog.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 backface-hidden transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
  >
    <!-- Cover -->
    <div
      class="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800"
    >
      <img
        :src="blog.cover"
        :alt="blog.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      ></div>

      <div class="absolute right-4 top-4">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
        >
          {{ dictStore.blogCategory[String(blog.categoryId)] }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4 right-4">
        <div
          class="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <i class="fa-regular fa-clock"></i>
          {{ formatWithoutSeconds(blog.postTime) }}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-4 p-5">
      <h3
        class="text-2xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400"
      >
        {{ blog.title }}
      </h3>

      <ProjectTech :technology="dictStore.blogTag[String(blog.tagId)]" />

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div
          class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
        >
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          阅读文章
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { formatWithoutSeconds } from "@/utils/date.js";
import ProjectTech from "@/components/ProjectTech.vue";
import { useDictStore } from "@/stores/dictStore";

const dictStore = useDictStore();

defineProps({
  blog: {
    type: Object,
    required: true,
  },
});
</script>
