<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      @click="close"
    >
      <div
        class="modal-card relative flex max-h-[calc(100vh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
        @click.stop
      >
        <!-- Sticky header: top bar + close button -->
        <div class="shrink-0">
          <!-- Decorative top bar -->
          <div
            class="h-1.5 w-full bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400"
          ></div>

          <!-- Close button -->
          <button
            class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-400 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-slate-600 dark:bg-slate-900/80 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-slate-300"
            @click="close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto px-8 pb-10 pt-8">
          <!-- Decorative opening quote -->
          <div class="mb-4 text-center">
            <span
              class="select-none text-[100px] leading-none font-serif text-sky-100 dark:text-sky-900/30"
              >&ldquo;</span
            >
          </div>

          <!-- Quote text -->
          <blockquote class="mb-8 text-center">
            <p
              class="whitespace-pre-line text-xl leading-relaxed tracking-wide text-slate-700 dark:text-slate-200"
            >
              {{ sentence.content }}
            </p>
          </blockquote>

          <!-- Divider -->
          <div class="mb-8 flex items-center justify-center gap-3">
            <div class="h-px w-12 bg-slate-200 dark:bg-slate-800"></div>
            <span class="text-xs text-slate-300 dark:text-slate-700">
              <i class="fa-solid fa-feather"></i>
            </span>
            <div class="h-px w-12 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <!-- Source info -->
          <div class="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900/50">
            <div class="space-y-3">
              <!-- Title -->
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-book text-xs text-sky-400"></i>
                <span
                  class="text-lg font-semibold text-slate-800 dark:text-slate-100"
                >
                  《{{ sentence.title }}》
                </span>
              </div>

              <!-- Author & Dynasty -->
              <div
                class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
              >
                <i class="fa-solid fa-user-pen"></i>
                <span>{{ sentence.dynasty }} · {{ sentence.author }}</span>
              </div>

              <!-- Category badge -->
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
                >
                  {{ dictStore.sentenceCategory[String(sentence.categoryId)] }}
                </span>
              </div>
            </div>
          </div>

          <!-- External link -->
          <div class="mt-6 text-center">
            <a
              :href="sentence.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full bg-sky-50 px-5 py-2.5 text-sm font-medium text-sky-600 transition-colors hover:bg-sky-100 dark:bg-sky-900/20 dark:text-sky-400 dark:hover:bg-sky-900/40"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              搜索出处
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import { useDictStore } from "@/stores/dictStore";

const dictStore = useDictStore();

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  sentence: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const close = () => emit("close");

const handleKeydown = (e) => {
  if (!props.visible) return;
  if (e.key === "Escape") close();
};

// Lock body scroll when modal is open
watch(
  () => props.visible,
  (v) => {
    document.body.style.overflow = v ? "hidden" : "";
  },
);

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.modal-enter-active {
  transition: opacity 0.2s ease;
}

.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-card {
  opacity: 0;
  transform: scale(0.92) translateY(24px);
}

.modal-leave-to .modal-card {
  opacity: 0;
  transform: scale(0.92) translateY(24px);
}
</style>
