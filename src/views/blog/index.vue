<template>
  <InfiniteSection
    title="技术博客"
    subtitle="路漫漫其修远兮，吾将上下而求索"
    :api-fn="getMineBlogsList"
    :page-size="pageSize"
    grid-class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
    empty-icon="fa-solid fa-code"
  >
    <template #skeleton>
      <BlogSkeleton v-for="n in pageSize" :key="n" />
    </template>

    <template #content="{ list }">
      <BlogCard v-for="item in list" :key="item.id" :blog="item" />
    </template>
  </InfiniteSection>
</template>

<script setup>
import { getMineBlogsList } from "@/api/mine.js";
import InfiniteSection from "@/components/InfiniteSection.vue";
import BlogCard from "@/components/card/BlogCard.vue";
import BlogSkeleton from "@/components/skeleton/BlogSkeleton.vue";

const pageSize = 4 * 3;
</script>
