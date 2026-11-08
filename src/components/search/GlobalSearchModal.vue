<template>
  <transition name="search">
    <div
      v-if="visible"
      class="fixed inset-0 z-[99999] flex items-start justify-center bg-black/50 p-4 pt-[10vh] backdrop-blur-sm"
      @click="close"
    >
      <div
        class="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
        @click.stop
      >
        <!-- Input -->
        <div
          class="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800"
        >
          <i class="fa-solid fa-magnifying-glass text-slate-400"></i>

          <input
            ref="inputRef"
            v-model="keyword"
            type="text"
            placeholder="搜索点什么..."
            class="flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        <!-- Result -->
        <div class="max-h-[420px] overflow-y-auto p-2">
          <template v-if="results.length">
            <SearchResultItem
              v-for="(item, index) in results"
              :key="item.index"
              :item="item"
              :active="index === activeIndex"
              @click="handleClick(index)"
            />
          </template>

          <div v-else class="py-16 text-center text-sm text-slate-400">
            暂无搜索结果
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs text-slate-400 dark:border-slate-800"
        >
          <div class="flex items-center gap-4">
            <span>↑ ↓ 切换</span>

            <span>Enter 打开</span>

            <span>ESC 关闭</span>
          </div>

          <span> 搜索到 {{ results.length }} 条结果 </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useGlobalSearch } from "@/composables/useGlobalSearch";
import SearchResultItem from "./SearchResultItem.vue";

const inputRef = ref();

const {
  visible,
  keyword,
  results,
  activeIndex,
  open,
  close,
  moveUp,
  moveDown,
  select,
} = useGlobalSearch();

const handleKeydown = (e) => {
  // Ctrl + K
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();

    open();
  }

  if (!visible.value) return;

  // ESC
  if (e.key === "Escape") {
    close();
  }

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
  if (e.key === "Enter") {
    e.preventDefault();
    select();
  }
};

const handleClick = (index) => {
  activeIndex.value = index;
  select();
};

watch(visible, async (v) => {
  if (v) {
    // 自动聚焦
    await nextTick();
    inputRef.value?.focus();
  }
});

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
.search-enter-active,
.search-leave-active {
  transition: all 0.2s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
