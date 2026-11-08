<template>
  <InfiniteSection
    title="电子文藏"
    subtitle="问渠那得清如许，为有源头活水来"
    :api-fn="getMineArchivesList"
    :page-size="pageSize"
    grid-class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    empty-icon="fa-solid fa-archive"
  >
    <template #skeleton>
      <ArchiveSkeleton v-for="n in pageSize" :key="n" />
    </template>

    <template #content="{ list }">
      <ArchiveCard v-for="item in list" :key="item.id" :archive="item" />
    </template>
  </InfiniteSection>
</template>

<script setup>
import { getMineArchivesList } from "@/api/mine.js";
import InfiniteSection from "@/components/InfiniteSection.vue";
import ArchiveCard from "@/components/card/ArchiveCard.vue";
import ArchiveSkeleton from "@/components/skeleton/ArchiveSkeleton.vue";

const pageSize = 4 * 4;
</script>
