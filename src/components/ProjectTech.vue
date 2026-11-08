<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="tech in techList"
      :key="tech"
      class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    >
      {{ tech }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  technology: {
    type: String,
    default: "",
  },
});

const techList = computed(() => {
  return props.technology
    .split("+")
    .map((item) => item.trim())
    .filter(Boolean);
});
</script>
