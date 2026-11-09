<template>
  <section :aria-labelledby="headingId">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3.5">
      <div>
        <h2
          :id="headingId"
          class="text-2xl font-bold leading-snug tracking-tight text-slate-800 dark:text-slate-100"
        >
          {{ title }}
        </h2>
        <p v-if="description" class="mt-2 text-sm leading-relaxed home-muted">
          {{ description }}
        </p>
      </div>

      <router-link
        :to="to"
        class="home-section-link shrink-0 rounded-lg px-3 py-2 text-sm font-medium underline-offset-4 hover:underline"
        >{{ moreLabel }}</router-link
      >
    </div>

    <div :class="contentClass">
      <div
        v-if="state.loading && !state.items.length"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span class="sr-only">正在加载{{ title }}</span>
        <div aria-hidden="true">
          <slot name="loading" />
        </div>
      </div>
      <div
        v-else-if="state.error && !state.items.length"
        class="rounded-lg border border-slate-200 px-5 py-8 text-sm dark:border-slate-800"
        role="alert"
      >
        <p class="home-muted">{{ title }}暂时加载失败</p>
        <button
          type="button"
          class="mt-3 rounded text-sm font-medium text-blue-600 dark:text-blue-300 underline-offset-4 hover:underline"
          @click="$emit('retry')"
        >
          重新加载
        </button>
      </div>
      <p v-else-if="!state.items.length" class="py-8 text-sm home-muted">
        {{ emptyText }}
      </p>
      <slot v-else :items="state.items"></slot>
    </div>
  </section>
</template>

<script setup>
import { useId } from "vue";

defineProps({
  title: { type: String, required: true },
  contentClass: { type: String, default: "" },
  description: { type: String, default: "" },
  to: { type: String, required: true },
  moreLabel: { type: String, default: "查看全部" },
  emptyText: { type: String, default: "暂时没有内容" },
  state: { type: Object, required: true },
});
defineEmits(["retry"]);

const headingId = `home-section-${useId()}`;
</script>
