<template>
  <article
    class="home-project-card flex min-h-96 min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-white transition-colors hover:border-blue-400 motion-reduce:transition-none dark:bg-slate-900 dark:hover:border-blue-400"
  >
    <a
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
      class="home-project-cover relative flex h-36 w-full sm:h-40 items-center justify-center overflow-hidden"
      :aria-label="`查看项目 ${project.title || project.name}`"
    >
      <img
        v-if="project.cover && !coverBroken"
        :src="project.cover"
        :alt="project.title || project.name"
        class="size-20 object-contain sm:size-24"
        @error="coverBroken = true"
      />
      <div v-else class="text-4xl text-blue-600 dark:text-blue-300 opacity-50" aria-hidden="true">
        <i :class="routeIcon.blog"></i>
      </div>
    </a>
    <div class="flex flex-1 flex-col p-5 sm:p-4 lg:p-6">
      <p
        v-if="project.name && project.name !== project.title"
        class="mb-1 text-xs [overflow-wrap:anywhere] home-muted"
      >
        {{ project.name }}
      </p>
      <h3 class="text-xl font-semibold leading-normal tracking-tight">
        <a
          class="hover:text-blue-600 dark:hover:text-blue-300"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ project.title || project.name }}</a
        >
      </h3>
      <p class="mt-2.5 flex-1 text-sm leading-loose [overflow-wrap:anywhere] home-muted">
        {{ project.description }}
      </p>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-3 pt-1">
        <div class="flex min-w-0 flex-wrap gap-1.5">
          <span
            v-for="tech in parseTechnologies(project.technology)"
            :key="tech"
            class="home-tech rounded px-2 py-1 text-xs [overflow-wrap:anywhere]"
            >{{ tech }}</span
          >
        </div>
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 py-1 text-xs text-blue-600 dark:text-blue-300 underline-offset-4 hover:underline"
          :aria-label="`查看项目 ${project.title || project.name}`"
          >GitHub<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i
        ></a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { routeIcon } from "@/config.js";
import { parseTechnologies } from "@/utils/str.js";

defineProps({ project: { type: Object, required: true } });
const coverBroken = ref(false);
</script>
