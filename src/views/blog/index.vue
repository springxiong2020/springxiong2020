<template>
  <resource-list-page
    title-id="blog-title"
    title="技术博客"
    description="路漫漫其修远兮，吾将上下而求索"
    label="博客"
    unit="篇"
    empty-text="暂无技术博客"
    :fetch-page="getMineBlogsList"
  >
    <template #notice>
      <dictionary-error-notice :dictionaries="['blogCategory', 'blogTag']" label="分类或标签" />
    </template>
    <template #loading>
      <div>
        <blog-skeleton v-for="n in 8" :key="n" />
      </div>
    </template>
    <template #default="{ items: articles }">
      <ul
        class="divide-y divide-slate-200/80 border-y border-slate-200/80 dark:divide-slate-800 dark:border-slate-800"
      >
        <li v-for="article in articles" :key="article.id">
          <blog-entry :article="article" />
        </li>
      </ul>
    </template>
  </resource-list-page>
</template>

<script setup>
import { getMineBlogsList } from "@/api/mine.js";
import ResourceListPage from "@/components/ResourceListPage.vue";
import BlogSkeleton from "./BlogSkeleton.vue";
import BlogEntry from "./BlogEntry.vue";
import DictionaryErrorNotice from "@/components/notice/DictionaryErrorNotice.vue";

defineOptions({ name: "BlogPage" });
</script>
