<template>
  <teleport to="body">
    <transition name="search" @after-enter="focusSearchInput">
      <div
        v-if="visible"
        class="search-backdrop fixed inset-x-0 top-0 z-[99999] flex items-start justify-center bg-black/50 p-4 backdrop-blur-sm"
        :style="viewportStyle"
        @click="close"
      >
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          aria-label="全局搜索"
          tabindex="-1"
          class="flex max-h-full min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
          @click.stop
          @keydown="handleResultKeydown"
        >
          <!-- Input -->
          <div
            class="flex shrink-0 items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800"
          >
            <i class="fa-solid fa-magnifying-glass text-slate-400"></i>

            <input
              ref="inputRef"
              v-model="keyword"
              type="text"
              aria-label="搜索关键词"
              placeholder="搜索文章、项目、书籍…"
              class="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-2 text-base placeholder:text-slate-500 dark:placeholder:text-slate-400"
              @compositionstart="isComposing = true"
              @compositionend="isComposing = false"
              @blur="isComposing = false"
            />

            <button
              type="button"
              aria-label="关闭搜索"
              class="shrink-0 rounded-lg p-2"
              @click="close"
            >
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <!-- Result -->
          <div
            ref="resultsRef"
            class="min-h-0 max-h-[420px] overflow-y-auto overscroll-contain p-2"
            :aria-busy="loading"
          >
            <div
              v-if="!keyword.trim()"
              class="py-16 text-center text-sm text-slate-600 dark:text-slate-400"
            >
              输入关键词，搜索全站内容。
            </div>

            <div
              v-else-if="loading"
              class="py-16 text-center text-sm text-slate-600 dark:text-slate-400"
              role="status"
            >
              <i class="fa-solid fa-spinner animate-spin mr-2" aria-hidden="true"></i>
              正在搜索…
            </div>

            <div
              v-else-if="error"
              class="py-16 text-center text-sm text-slate-600 dark:text-slate-400"
              role="alert"
            >
              <p>搜索失败，请稍后重试。</p>
              <button
                type="button"
                class="mt-4 rounded-lg border border-slate-300 px-4 py-2 font-medium text-blue-700 hover:bg-slate-100 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
                @click="retry()"
              >
                重试
              </button>
            </div>

            <template v-else-if="results.length">
              <search-result-item
                v-for="(item, index) in results"
                :key="`${item.type}:${item.id}`"
                :item="item"
                :active="index === activeIndex"
                :data-result-index="index"
                @click="handleClick(index)"
              />
            </template>

            <div v-else class="py-16 text-center text-sm text-slate-600 dark:text-slate-400">
              未找到相关内容，请尝试其他关键词。
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400"
          >
            <div class="flex items-center gap-4">
              <span>↑ ↓ 切换</span>
              <span>Enter 打开</span>
              <span>ESC 关闭</span>
            </div>

            <span v-if="keyword.trim() && !loading && !error"
              >搜索到 {{ results.length }} 条结果</span
            >
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useGlobalSearch } from "@/composables/useGlobalSearch";
import { useModalFocus } from "@/composables/useModalFocus";
import SearchResultItem from "./SearchResultItem.vue";

const inputRef = ref();
const dialogRef = ref();
const resultsRef = ref();
const isComposing = ref(false);
const viewportStyle = ref({});

const {
  visible,
  keyword,
  results,
  loading,
  error,
  retry,
  activeIndex,
  open,
  close,
  moveUp,
  moveDown,
  select,
} = useGlobalSearch();

const { isTop } = useModalFocus(
  visible,
  dialogRef,
  () => {
    if (!isComposing.value) close();
  },
  inputRef,
);

const focusSearchInput = () => {
  if (visible.value && isTop()) {
    inputRef.value?.focus({ preventScroll: true });
  }
};

// 部分移动浏览器只缩小 visualViewport，100dvh 不一定随软键盘变化。
watch(visible, (open, _previous, onCleanup) => {
  if (!open) {
    viewportStyle.value = {};
    return;
  }
  const viewport = window.visualViewport;
  const syncViewport = () => {
    const height = viewport?.height ?? window.innerHeight;
    viewportStyle.value = {
      top: `${viewport?.offsetTop ?? 0}px`,
      height: `${height}px`,
      paddingTop: `${Math.max(16, height * 0.1)}px`,
    };
  };
  syncViewport();
  window.addEventListener("resize", syncViewport);
  viewport?.addEventListener("resize", syncViewport);
  viewport?.addEventListener("scroll", syncViewport);
  onCleanup(() => {
    window.removeEventListener("resize", syncViewport);
    viewport?.removeEventListener("resize", syncViewport);
    viewport?.removeEventListener("scroll", syncViewport);
  });
});

watch(
  [activeIndex, results, viewportStyle],
  () => {
    const container = resultsRef.value;
    const item = container?.querySelector(`[data-result-index="${activeIndex.value}"]`);
    if (!item) return;
    const bounds = container.getBoundingClientRect();
    const itemBounds = item.getBoundingClientRect();
    if (itemBounds.top < bounds.top) {
      container.scrollTop += itemBounds.top - bounds.top;
    } else if (itemBounds.bottom > bounds.bottom) {
      container.scrollTop += itemBounds.bottom - bounds.bottom;
    }
  },
  { flush: "post" },
);

watch(visible, (open) => {
  if (!open) isComposing.value = false;
});

const handleKeydown = (e) => {
  if (isComposing.value || e.isComposing) return;

  // Ctrl + K 或 Meta + K（Super / Command）。
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();

    open();
  }
};

const handleResultKeydown = (e) => {
  if (!visible.value || !isTop()) return;
  if (isComposing.value || e.isComposing) return;

  // ArrowDown
  if (e.key === "ArrowDown") {
    e.preventDefault();
    moveDown();
  }

  // ArrowUp
  if (e.key === "ArrowUp") {
    e.preventDefault();
    moveUp();
  }

  // Enter
  // 229 仅用于防止确认候选词的 Enter 误打开结果，不屏蔽方向键。
  if (e.key === "Enter" && e.keyCode !== 229 && e.target === inputRef.value) {
    e.preventDefault();
    select();
  }
};

const handleClick = (index) => {
  activeIndex.value = index;
  select();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("global-search-open", open);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("global-search-open", open);
});
</script>

<style scoped>
.search-backdrop {
  height: 100vh;
  height: 100dvh;
  padding-top: max(1rem, 10dvh);
}

.search-enter-active,
.search-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
