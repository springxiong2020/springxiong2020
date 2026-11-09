<template>
  <button
    type="button"
    class="group relative flex min-h-16 w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors motion-reduce:transition-none sm:gap-4 sm:px-4"
    :class="
      active ? 'bg-blue-50 dark:bg-blue-950/60' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
    "
  >
    <span
      v-if="active"
      class="absolute inset-y-4 left-0 w-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
      aria-hidden="true"
    ></span>

    <span
      class="flex size-9 shrink-0 items-center justify-center rounded-lg"
      :class="
        active
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300'
          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
      "
      aria-hidden="true"
    >
      <i :class="routeIcon[item.type] || 'fa-solid fa-circle-question'"></i>
    </span>

    <span class="min-w-0 flex-1">
      <span
        class="block truncate text-sm font-semibold leading-6"
        :class="active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'"
      >
        {{ item.title }}
      </span>
      <span
        v-if="item.description"
        class="mt-0.5 block truncate text-xs leading-5 text-slate-500 dark:text-slate-400"
      >
        {{ item.description }}
      </span>
    </span>

    <i
      class="fa-solid fa-arrow-up-right-from-square shrink-0 text-xs"
      :class="active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'"
      aria-hidden="true"
    ></i>
  </button>
</template>

<script setup>
import { routeIcon } from "@/config.js";

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
