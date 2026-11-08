<template>
  <section>
    <div class="mb-10 flex items-end justify-between">
      <!-- Title -->
      <div>
        <h2
          class="text-3xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          {{ title }}
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-400">
          {{ subtitle }}
        </p>
      </div>

      <div class="hidden text-sm text-slate-500 dark:text-slate-400 md:block">
        共 {{ total }} 条
      </div>
    </div>

    <!-- Content -->
    <div :class="gridClass">
      <template v-if="loading && list.length === 0">
        <slot name="skeleton"></slot>
      </template>

      <slot name="content" :list="list"></slot>
    </div>

    <!-- Empty -->
    <div
      v-if="!loading && list.length === 0"
      class="rounded-3xl border border-dashed border-slate-200/60 py-20 text-center dark:border-white/5 bg-white/30 dark:bg-white/[0.01] backdrop-blur-sm"
    >
      <i
        :class="[
          emptyIcon,
          'text-5xl text-slate-300 dark:text-slate-700/50 animate-[float_4s_ease-in-out_infinite]',
        ]"
      ></i>
      <h3
        class="mt-6 text-sm font-medium text-slate-400 dark:text-slate-500 tracking-wider"
      >
        空空如也~
      </h3>
    </div>

    <!-- Infinite Scroll Anchor & Status Indicator -->
    <div
      ref="loadMoreRef"
      class="mt-14 flex justify-center py-6 border-t border-transparent"
    >
      <!-- Loading More Status -->
      <div
        v-if="loadingMore || (loading && list.length > 0)"
        class="flex items-center gap-2.5 font-mono text-xs tracking-widest text-slate-400 dark:text-slate-500"
      >
        <i class="fa-solid fa-spinner animate-spin text-sky-500" />
        <span>Loading...</span>
      </div>

      <!-- No More Data Status -->
      <div
        v-else-if="!hasMore && list.length > 0"
        class="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-300 dark:text-slate-700 select-none"
      >
        — END OF THE PAGE —
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { usePagination } from "@/composables/usePagination.js";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  apiFn: { type: Function, required: true },
  pageSize: { type: Number, default: 6 },
  gridClass: {
    type: String,
    default: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
  },
  emptyIcon: { type: String, default: "fa-solid fa-code" },
});

const { list, total, loading, loadingMore, hasMore, loadMore } = usePagination(
  props.apiFn,
  props.pageSize,
);

const loadMoreRef = ref();
let observer = null;

onMounted(() => {
  // 初始化交叉观察器
  observer = new IntersectionObserver(
    ([entry]) => {
      // 当锚点可见，且满足加载条件时，自动触发下一页
      if (
        entry.isIntersecting &&
        hasMore.value &&
        !loadingMore.value &&
        !loading.value
      ) {
        loadMore();
      }
    },
    {
      root: null, // 默认为视口
      rootMargin: "200px", // 极其关键：提前 200px 预加载，拒绝让用户看到断层
      threshold: 0,
    },
  );

  // 开始监听底部锚点
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
});

onBeforeUnmount(() => {
  // 销毁组件时断开连接，防止内存泄漏
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
