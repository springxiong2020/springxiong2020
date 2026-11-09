<template>
  <article
    class="flex min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900"
    :class="featured ? 'h-full flex-col' : 'flex-col gap-4 sm:flex-row sm:gap-6'"
  >
    <div :class="featured ? 'mb-6 flex items-start justify-between gap-4' : 'shrink-0'">
      <div
        class="flex shrink-0 items-center justify-center"
        :class="featured ? 'size-16 sm:size-20' : 'size-14 sm:size-16'"
      >
        <img
          v-if="project.cover && !coverFailed"
          :src="project.cover"
          :alt="`${project.title || project.name} logo`"
          loading="lazy"
          class="size-full object-contain"
          @error="coverFailed = true"
        />
        <i
          v-else
          class="fa-solid fa-cube text-3xl text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        ></i>
      </div>
      <project-status
        v-if="featured && project.finishDate"
        :finish-date="project.finishDate"
        class="!bg-transparent !px-0 !font-normal"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
          <h3
            class="break-words font-semibold leading-snug text-slate-900 dark:text-slate-100"
            :class="featured ? 'text-2xl' : 'text-lg'"
          >
            {{ project.title || project.name }}
          </h3>
          <p
            v-if="project.name && project.name !== project.title"
            class="mt-2 break-all text-xs leading-5 text-slate-500 dark:text-slate-400"
          >
            {{ project.name }}
          </p>
        </div>
        <project-status
          v-if="!featured && project.finishDate"
          :finish-date="project.finishDate"
          class="!bg-transparent !px-0 !font-normal"
        />
      </header>
      <p
        v-if="project.description"
        class="mt-4 max-w-prose whitespace-pre-line break-words text-sm leading-7 text-slate-600 dark:text-slate-300"
      >
        {{ project.description }}
      </p>
      <p v-else class="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
        项目说明待补充，可前往 GitHub 查看 README。
      </p>
      <ul v-if="technologies.length" class="mt-5 flex flex-wrap gap-2" aria-label="技术栈">
        <li
          v-for="tech in technologies"
          :key="tech"
          class="rounded border border-slate-200/80 px-2 py-0.5 text-xs leading-5 text-slate-500 dark:border-slate-700 dark:text-slate-400"
        >
          {{ tech }}
        </li>
      </ul>
      <div class="mt-auto pt-6">
        <div
          class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-slate-100 pt-3 dark:border-slate-800"
        >
          <time v-if="date" :datetime="date" class="text-xs text-slate-500 dark:text-slate-400"
            >开始于 {{ date }}</time
          >
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-blue-600 hover:underline motion-reduce:transition-none dark:text-slate-400 dark:hover:text-blue-300"
            :aria-label="`前往 GitHub 查看 ${project.title || project.name}（在新窗口打开）`"
          >
            <i :class="routeIcon.project" aria-hidden="true"></i>GitHub<i
              class="fa-solid fa-arrow-up-right-from-square text-xs"
              aria-hidden="true"
            ></i>
          </a>
          <span v-else class="text-xs text-slate-500 dark:text-slate-400">仓库链接待补充</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import ProjectStatus from "./ProjectStatus.vue";
import { formatDate } from "@/utils/date.js";
import { parseTechnologies } from "@/utils/str.js";
import { routeIcon } from "@/config";

const props = defineProps({
  project: { type: Object, required: true },
  featured: Boolean,
});
const coverFailed = ref(false);
const technologies = computed(() => parseTechnologies(props.project.technology));
const date = computed(() => formatDate(props.project.startDate));
</script>
