<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
        @click.self="close"
      >
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-label="`诗词详情：${sentence.title || '无题'}`"
          tabindex="-1"
          class="modal-card relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)] sm:max-h-[calc(100dvh-3rem)] dark:border-slate-800 dark:bg-slate-950"
          @click.stop
        >
          <div class="flex shrink-0 justify-end px-3 pt-3 sm:px-4 sm:pt-4">
            <button
              type="button"
              aria-label="关闭诗词详情"
              class="flex size-11 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              @click="close"
            >
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <div
            class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 sm:px-10 sm:pb-10"
          >
            <dictionary-error-notice :dictionaries="['sentenceCategory']" />

            <header
              class="sentence-heading relative border-b border-slate-200/80 pb-7 dark:border-slate-800"
            >
              <h2
                class="sentence-serif break-words text-[1.75rem] font-semibold leading-relaxed tracking-[0.04em] text-slate-900 sm:text-[2rem] dark:text-slate-100"
              >
                {{ sentence.title || "无题" }}
              </h2>
              <div
                v-if="sentence.dynasty || sentence.author || categoryName"
                class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400"
              >
                <div v-if="sentence.dynasty || sentence.author" class="flex flex-wrap gap-x-3">
                  <span v-if="sentence.dynasty">{{ sentence.dynasty }}</span>
                  <span v-if="sentence.author">{{ sentence.author }}</span>
                </div>
                <span
                  v-if="categoryName"
                  class="rounded border border-blue-200/80 bg-blue-50 px-2 py-0.5 text-xs tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                  >{{ categoryName }}</span
                >
              </div>
            </header>

            <blockquote class="my-9 sm:my-10">
              <p
                class="sentence-serif whitespace-pre-wrap break-words text-lg leading-[2.05] tracking-[0.025em] text-slate-700 sm:text-xl dark:text-slate-200"
              >
                {{ sentence.content }}
              </p>
            </blockquote>

            <p
              v-if="collectedDate"
              class="flex items-center gap-3 text-xs leading-5 text-slate-500 dark:text-slate-400"
            >
              <span class="h-px w-5 bg-slate-300 dark:bg-slate-700" aria-hidden="true"></span>
              收录于 <time :datetime="collectedDate">{{ collectedDate }}</time>
            </p>
          </div>

          <footer
            class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 bg-slate-50/80 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <copy-original-button :text="sentence.content || ''" />

            <a
              v-if="sentence.link"
              :href="sentence.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-blue-700 underline-offset-4 transition-colors hover:bg-blue-50 hover:underline dark:text-blue-300 dark:hover:bg-blue-950"
            >
              搜索出处
              <i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i>
            </a>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, ref, toRef } from "vue";
import DictionaryErrorNotice from "@/components/notice/DictionaryErrorNotice.vue";
import CopyOriginalButton from "@/components/CopyOriginalButton.vue";
import { useModalFocus } from "@/composables/useModalFocus";
import { useDictStore } from "@/stores/dictStore";
import { formatWithoutSeconds } from "@/utils/date";

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

const dictStore = useDictStore();
const categoryName = computed(
  () => dictStore.sentenceCategory[String(props.sentence.categoryId)] || "",
);

const collectedDate = computed(() => formatWithoutSeconds(props.sentence.createdAt));

const close = () => emit("close");

const dialogRef = ref();
useModalFocus(toRef(props, "visible"), dialogRef, close);
</script>

<style scoped>
.sentence-serif {
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
}

.sentence-heading::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 2rem;
  height: 2px;
  background: #2563eb;
}

:global(.dark) .sentence-heading::after {
  background: #60a5fa;
}

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
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.modal-enter-from .modal-card {
  opacity: 0;
  transform: scale(0.98) translateY(8px);
}

.modal-leave-to .modal-card {
  opacity: 0;
  transform: scale(0.98) translateY(8px);
}
</style>
