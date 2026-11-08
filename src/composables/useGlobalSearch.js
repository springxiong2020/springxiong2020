import { ref, watch } from "vue";
import { searchMineResources } from "@/api/mine.js";

export function useGlobalSearch() {
  const visible = ref(false);
  const keyword = ref("");
  const activeIndex = ref(0);
  const results = ref([]);
  const loading = ref(false);

  let debounceTimer = null;

  // 监听关键字变化，触发 API 请求
  watch(keyword, (newVal) => {
    // 每次关键字变化时，重置选中索引
    activeIndex.value = 0;

    // 清除上一次的定时器，实现防抖
    if (debounceTimer) clearTimeout(debounceTimer);

    const query = newVal.trim();

    if (!query) {
      results.value = [];
      return;
    }

    // 设置 300ms 的防抖延迟
    debounceTimer = setTimeout(async () => {
      loading.value = true;
      try {
        const data = await searchMineResources(keyword.value);
        results.value = data || [];
      } catch (error) {
        results.value = [];
      } finally {
        loading.value = false;
      }
    }, 300);
  });

  const open = () => {
    visible.value = true;
    activeIndex.value = 0;
  };

  const close = () => {
    visible.value = false;
    keyword.value = "";
    results.value = []; // 关闭弹窗时清空结果
  };

  const moveDown = () => {
    if (!results.value.length) return;
    activeIndex.value = (activeIndex.value + 1) % results.value.length;
  };

  const moveUp = () => {
    if (!results.value.length) return;
    activeIndex.value =
      (activeIndex.value - 1 + results.value.length) % results.value.length;
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
    open,
    close,
    moveUp,
    moveDown,
    select,
  };
}
