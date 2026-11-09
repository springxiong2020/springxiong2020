import { ref, watch, onScopeDispose } from "vue";
import { searchMineResources } from "@/api/mine.js";

export function useGlobalSearch() {
  const visible = ref(false);
  const keyword = ref("");
  const activeIndex = ref(0);
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  let debounceTimer = null;
  let controller = null;
  let requestId = 0;

  const cancelPendingSearch = () => {
    // 取消请求之外，也使未及时响应取消的旧任务失效。
    requestId += 1;
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    controller?.abort();
    controller = null;
    loading.value = false;
  };

  const scheduleSearch = (newVal) => {
    // 每次关键字变化时，重置选中索引
    activeIndex.value = 0;

    cancelPendingSearch();
    results.value = [];
    error.value = null;

    const query = newVal.trim();

    if (!query || !visible.value) return;

    const currentRequestId = requestId;
    // 防抖等待期间也显示搜索中，避免短暂显示无结果。
    loading.value = true;

    // 设置 300ms 的防抖延迟
    debounceTimer = setTimeout(async () => {
      debounceTimer = null;
      const currentController = new AbortController();
      controller = currentController;
      loading.value = true;
      try {
        const data = await searchMineResources(query, {
          signal: currentController.signal,
        });
        if (currentRequestId === requestId) results.value = data || [];
      } catch (err) {
        if (currentRequestId === requestId) {
          results.value = [];
          error.value = err;
        }
      } finally {
        if (currentRequestId === requestId) {
          loading.value = false;
          controller = null;
        }
      }
    }, 300);
  };

  watch(keyword, scheduleSearch, { flush: "sync" });

  const retry = () => scheduleSearch(keyword.value);

  onScopeDispose(cancelPendingSearch);

  const open = () => {
    visible.value = true;
    activeIndex.value = 0;
  };

  const close = () => {
    cancelPendingSearch();
    visible.value = false;
    keyword.value = "";
    error.value = null;
    results.value = []; // 关闭弹窗时清空结果
  };

  const moveDown = () => {
    if (!results.value.length) return;
    activeIndex.value = (activeIndex.value + 1) % results.value.length;
  };

  const moveUp = () => {
    if (!results.value.length) return;
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length;
  };

  const select = () => {
    const item = results.value[activeIndex.value];
    if (!item) return;
    window.open(item.link, "_blank");
    // close();
  };

  return {
    visible,
    keyword,
    activeIndex,
    results,
    loading,
    error,
    retry,
    open,
    close,
    moveUp,
    moveDown,
    select,
  };
}
