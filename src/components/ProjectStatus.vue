<template>
  <div
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
    :class="statusClass"
  >
    <span class="h-2 w-2 rounded-full bg-current"></span>

    {{ statusText }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDate } from "@/utils/date.js";

const props = defineProps({
  finishDate: {
    type: String,
    required: true,
  },
});

const isOngoing = computed(() => {
  return props.finishDate?.startsWith("1970");
});

const statusText = computed(() => {
  return isOngoing.value
    ? "进行中"
    : `已完成（${formatDate(props.finishDate)}）`;
});

const statusClass = computed(() => {
  return isOngoing.value
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
});
</script>
