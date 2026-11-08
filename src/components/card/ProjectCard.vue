<template>
  <a
    :href="project.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 backface-hidden transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
  >
    <!-- Cover -->
    <div
      class="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800"
    >
      <img
        :src="project.cover"
        :alt="project.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      ></div>

      <!-- Github -->
      <div class="absolute right-4 top-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/40 text-white backdrop-blur"
        >
          <i class="fa-brands fa-github text-lg"></i>
        </div>
      </div>

      <!-- Bottom -->
      <div class="absolute bottom-4 left-4 right-4">
        <ProjectStatus :finish-date="project.finishDate" />
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-5 p-6">
      <!-- Header -->
      <div>
        <div
          class="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
        >
          <i class="fa-solid fa-cube"></i>

          {{ project.name }}
        </div>

        <h3
          class="text-2xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400"
        >
          {{ project.title }}
        </h3>
      </div>

      <!-- Description -->
      <p
        class="line-clamp-3 min-h-[72px] text-sm leading-7 text-slate-600 dark:text-slate-300"
      >
        {{ project.description }}
      </p>

      <!-- Tech -->
      <ProjectTech :technology="project.technology" />

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div
          class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
        >
          <i class="fa-regular fa-calendar"></i>

          {{ formatDate(project.startDate) }}
        </div>

        <div
          class="flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400"
        >
          查看项目

          <i
            class="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"
          ></i>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { formatDate } from "@/utils/date.js";
import ProjectStatus from "@/components/ProjectStatus.vue";
import ProjectTech from "@/components/ProjectTech.vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
