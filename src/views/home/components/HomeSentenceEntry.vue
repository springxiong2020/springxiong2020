<template>
  <article class="relative pt-1">
    <i
      class="fa-solid fa-quote-right pointer-events-none absolute -top-1 right-0 home-reading-mark text-5xl"
      aria-hidden="true"
    ></i>
    <h3
      class="pr-14 line-clamp-2 font-serif text-lg font-semibold leading-7 [overflow-wrap:anywhere]"
    >
      {{ sentence.title }}
    </h3>
    <p class="mt-2 truncate text-xs home-muted">
      {{ [sentence.dynasty, sentence.author].filter(Boolean).join(" · ") }}
    </p>
    <blockquote
      class="font-serif mt-4 line-clamp-3 whitespace-pre-line [overflow-wrap:anywhere] text-base leading-7 text-slate-700 dark:text-slate-300"
    >
      {{ sentence.content }}
    </blockquote>
    <button
      type="button"
      class="mt-3 rounded text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-300 line-clamp-3"
      aria-haspopup="dialog"
      :aria-label="`阅读《${sentence.title || '无题'}》全文`"
      @click="emit('read', sentence, $event)"
    >
      阅读全文
    </button>
  </article>
</template>

<script setup>
defineProps({ sentence: { type: Object, required: true } });
const emit = defineEmits(["read"]);
</script>
