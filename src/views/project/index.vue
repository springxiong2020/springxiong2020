<template>
  <resource-list-page
    title-id="project-title"
    title="开源项目"
    description="纸上得来终觉浅，绝知此事要躬行"
    label="项目"
    unit="个"
    empty-text="暂无开源项目"
    :fetch-page="getMineProjectsList"
  >
    <template #loading>
      <div class="grid gap-6 md:grid-cols-2">
        <project-skeleton v-for="n in 2" :key="n" />
      </div>
    </template>
    <template #default="{ items: projects }">
      <section v-if="projects.length" aria-labelledby="featured-title">
        <h2 id="featured-title" class="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          精选项目
        </h2>
        <div class="grid items-start gap-6 md:grid-cols-2">
          <project-entry
            v-for="project in projects.slice(0, 2)"
            :key="project.id"
            :project="project"
            featured
          />
        </div>
      </section>
      <section v-if="projects.length > 2" class="mt-8" aria-labelledby="other-projects-title">
        <h2 id="other-projects-title" class="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          其余项目
        </h2>
        <div class="grid gap-4">
          <project-entry
            v-for="project in projects.slice(2)"
            :key="project.id"
            :project="project"
          />
        </div>
      </section>
    </template>
  </resource-list-page>
</template>

<script setup>
import { getMineProjectsList } from "@/api/mine.js";
import ResourceListPage from "@/components/ResourceListPage.vue";
import ProjectSkeleton from "./ProjectSkeleton.vue";
import ProjectEntry from "./ProjectEntry.vue";

defineOptions({ name: "ProjectPage" });
</script>
