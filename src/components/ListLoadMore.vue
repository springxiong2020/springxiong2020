<template>
  <div
    class="mt-8 flex min-h-16 items-center justify-center gap-4 py-3 sm:mt-10"
    :aria-busy="loading"
  >
    <span class="h-px w-8 bg-slate-200 sm:w-16 dark:bg-slate-800" aria-hidden="true"></span>
    <div class="min-w-0 text-center">
      <p
        v-if="error && !loading"
        role="alert"
        class="mb-1 text-xs leading-5 text-slate-500 dark:text-slate-400"
      >
        加载失败，已加载的内容会保留。
      </p>
      <button
        v-if="loading || error || hasMore"
        type="button"
        :disabled="loading"
        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:bg-blue-50 hover:text-blue-600 disabled:cursor-wait disabled:text-slate-500 disabled:hover:bg-transparent motion-reduce:transition-none dark:text-slate-400 dark:hover:bg-blue-950 dark:hover:text-blue-300 dark:disabled:text-slate-500"
        @click="requestLoad"
      >
        <i
          v-if="loading"
          class="fa-solid fa-spinner animate-spin motion-reduce:animate-none"
          aria-hidden="true"
        ></i>
        <span role="status" aria-live="polite">{{
          loading ? "正在加载…" : error ? "重新加载" : `加载更多${label}`
        }}</span>
        <i
          v-if="!loading && !error"
          class="fa-solid fa-chevron-down text-xs"
          aria-hidden="true"
        ></i>
      </button>
      <p v-else role="status" class="px-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
        已显示全部{{ label }}
      </p>
    </div>
    <span class="h-px w-8 bg-slate-200 sm:w-16 dark:bg-slate-800" aria-hidden="true"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  hasMore: { type: Boolean, required: true },
  label: { type: String, default: "内容" },
});
const emit = defineEmits(["load"]);
const requestLoad = () => {
  if (!props.loading && (props.hasMore || props.error)) emit("load");
};
</script>
