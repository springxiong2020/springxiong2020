<template>
  <section :aria-labelledby="titleId">
    <header class="mb-8">
      <h1 :id="titleId" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {{ title }}
      </h1>
      <p class="mt-3 text-slate-500 dark:text-slate-400">{{ description }}</p>
    </header>

    <slot name="notice" />

    <p class="mb-5 text-sm text-slate-500 dark:text-slate-400" role="status" aria-live="polite">
      {{
        loading
          ? `正在加载${label}（已加载 ${items.length} ${unit}）…`
          : `已加载 ${items.length} ${unit}${label}`
      }}
    </p>

    <div
      v-if="error && !items.length"
      class="mb-5 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900"
      role="alert"
    >
      <p>{{ label }}加载失败，请重试，已加载的内容会保留。</p>
      <button
        type="button"
        class="text-sm font-medium text-blue-700 hover:underline focus-visible:rounded dark:text-blue-400"
        @click="load"
      >
        重新加载
      </button>
    </div>

    <div v-if="loading && !items.length" aria-busy="true" :aria-label="`正在加载${label}`">
      <slot name="loading" />
    </div>
    <slot v-else-if="items.length" :items="items" />
    <div
      v-else-if="!loading && !error"
      :class="emptyClass"
      class="py-16 text-center text-slate-500 dark:text-slate-400"
    >
      <p>{{ emptyText }}</p>
    </div>

    <list-load-more
      v-if="items.length"
      :loading="loading"
      :error="error"
      :has-more="hasMore"
      :label="label"
      @load="load"
    />
  </section>
</template>

<script setup>
import ListLoadMore from "@/components/ListLoadMore.vue";
import { usePaginatedList } from "@/composables/usePaginatedList.js";

const props = defineProps({
  titleId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  label: { type: String, required: true },
  unit: { type: String, required: true },
  emptyText: { type: String, required: true },
  emptyClass: { type: String, default: "" },
  fetchPage: { type: Function, required: true },
});

const { items, loading, error, hasMore, load } = usePaginatedList(props.fetchPage);
</script>
