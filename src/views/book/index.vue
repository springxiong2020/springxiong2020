<template>
  <resource-list-page
    title-id="book-title"
    title="读书札记"
    description="粗缯大布裹生涯，腹有诗书气自华"
    label="书籍"
    unit="本"
    empty-text="暂无阅读记录"
    empty-class="rounded-2xl border border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
    :fetch-page="getMineBooksList"
  >
    <template #loading>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <book-skeleton v-for="n in 8" :key="n" />
      </div>
    </template>
    <template #default="{ items: books }">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <book-entry v-for="book in books" :key="book.id" :book="book" />
      </div>
    </template>
  </resource-list-page>
</template>

<script setup>
import { getMineBooksList } from "@/api/mine.js";
import ResourceListPage from "@/components/ResourceListPage.vue";
import BookSkeleton from "./BookSkeleton.vue";
import BookEntry from "./BookEntry.vue";

defineOptions({ name: "BookPage" });
</script>
