<template>
  <resource-list-page
    title-id="archive-title"
    title="电子文藏"
    description="问渠那得清如许，为有源头活水来"
    label="文藏"
    unit="项"
    empty-text="暂无电子文藏"
    empty-class="rounded-xl border border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
    :fetch-page="getMineArchivesList"
  >
    <template #loading>
      <div class="space-y-4">
        <archive-skeleton v-for="n in 8" :key="n" />
      </div>
    </template>
    <template #default="{ items: archives }">
      <div class="space-y-4">
        <archive-entry v-for="archive in archives" :key="archive.id" :archive="archive" />
      </div>
    </template>
  </resource-list-page>
</template>

<script setup>
import { getMineArchivesList } from "@/api/mine.js";
import ResourceListPage from "@/components/ResourceListPage.vue";
import ArchiveSkeleton from "./ArchiveSkeleton.vue";
import ArchiveEntry from "./ArchiveEntry.vue";

defineOptions({ name: "ArchivePage" });
</script>
