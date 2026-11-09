<template>
  <span class="inline-flex flex-wrap items-center gap-2">
    <button
      type="button"
      :disabled="copying || !text"
      class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      @click="copy"
    >
      <i class="fa-regular fa-copy" aria-hidden="true"></i>{{ copying ? "正在复制…" : "复制原文" }}
    </button>
    <span
      class="text-xs"
      :class="
        message === '原文已复制'
          ? 'text-emerald-700 dark:text-emerald-400'
          : 'text-slate-500 dark:text-slate-400'
      "
      role="status"
      aria-live="polite"
      >{{ message }}</span
    >
  </span>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({ text: { type: String, default: "" } });
const message = ref("");
const copying = ref(false);

watch(
  () => props.text,
  () => {
    message.value = "";
  },
);

async function copy() {
  if (copying.value) return;
  copying.value = true;
  message.value = "";
  try {
    await navigator.clipboard.writeText(props.text);
    message.value = "原文已复制";
  } catch {
    message.value = "复制失败，请选中原文手动复制。";
  } finally {
    copying.value = false;
  }
}
</script>
