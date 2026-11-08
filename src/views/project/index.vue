<template>
  <InfiniteSection
    title="开源项目"
    subtitle="纸上得来终觉浅，绝知此事要躬行"
    :api-fn="getMineProjectsList"
    :page-size="pageSize"
    grid-class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
    empty-icon="fa-brands fa-github"
  >
    <template #skeleton>
      <ProjectSkeleton v-for="n in pageSize" :key="n" />
    </template>

    <template #content="{ list }">
      <ProjectCard v-for="item in list" :key="item.id" :project="item" />
    </template>
  </InfiniteSection>
</template>

<script setup>
import { getMineProjectsList } from "@/api/mine.js";
import InfiniteSection from "@/components/InfiniteSection.vue";
import ProjectCard from "@/components/card/ProjectCard.vue";
import ProjectSkeleton from "@/components/skeleton/ProjectSkeleton.vue";

const pageSize = 4 * 3;
</script>
