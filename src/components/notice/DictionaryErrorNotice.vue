<template>
  <div
    v-if="hasErrors"
    class="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800 dark:bg-slate-900"
    role="status"
    aria-live="polite"
    :aria-busy="dictStore.loading"
  >
    <div class="flex items-start gap-3">
      <span
        class="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        aria-hidden="true"
      >
        <i class="fa-solid fa-circle-exclamation text-lg" aria-hidden="true"></i>
      </span>
      <div class="min-w-0">
        <h2 class="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
          {{ label }}暂时加载失败
        </h2>
        <p class="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
          部分信息未完整显示，请重新加载。
        </p>
      </div>
    </div>
    <button
      type="button"
      :disabled="dictStore.loading"
      class="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 sm:self-auto dark:bg-blue-500 dark:hover:bg-blue-600"
      @click="dictStore.initDict()"
    >
      {{ dictStore.loading ? "正在加载…" : "重新加载" + label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDictStore } from "@/stores/dictStore.js";

const props = defineProps({
  dictionaries: { type: Array, required: true },
  label: { type: String, default: "分类信息" },
});
const dictStore = useDictStore();
const hasErrors = computed(
  () => dictStore.hasErrors && props.dictionaries.some((key) => dictStore.status[key]?.error),
);
</script>
