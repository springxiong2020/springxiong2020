<template>
  <InfiniteSection
    title="读书札记"
    subtitle="粗缯大布裹生涯，腹有诗书气自华"
    :api-fn="getMineBooksList"
    :page-size="pageSize"
    grid-class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    empty-icon="fa-solid fa-book-open"
  >
    <template #skeleton>
      <BookSkeleton v-for="n in pageSize" :key="n" />
    </template>

    <template #content="{ list }">
      <BookCard v-for="item in list" :key="item.id" :book="item" />
    </template>
  </InfiniteSection>
</template>

<script setup>
import { getMineBooksList } from "@/api/mine.js";
import InfiniteSection from "@/components/InfiniteSection.vue";
import BookCard from "@/components/card/BookCard.vue";
import BookSkeleton from "@/components/skeleton/BookSkeleton.vue";

const pageSize = 4 * 4;
</script>
