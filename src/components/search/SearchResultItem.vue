<template>
  <button
    class="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all"
    :class="
      active
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
    "
  >
    <!-- Icon -->
    <div
      class="flex h-10 w-10 items-center justify-center rounded-xl"
      :class="active ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-800'"
    >
      <i :class="cfg.iconMap[item.type]"></i>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="truncate text-sm font-semibold">
        {{ item.title }}
      </div>

      <div class="truncate text-xs opacity-70">
        {{ item.description }}
      </div>
    </div>

    <!-- Arrow -->
    <i class="fa-solid fa-arrow-up-right-from-square text-xs opacity-50"></i>
  </button>
</template>

<script setup>
import { cfg } from "@/config.js";

defineProps({
  item: {
    type: Object,
    required: true,
  },

  active: {
    type: Boolean,
    default: false,
  },
});
</script>
