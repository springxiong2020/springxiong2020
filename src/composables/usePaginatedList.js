import { onBeforeUnmount, onMounted, ref } from "vue";

export function usePaginatedList(fetchPage, { pageSize = 8 } = {}) {
  const items = ref([]);
  const loading = ref(true);
  const error = ref(false);
  const hasMore = ref(true);
  const controller = new AbortController();
  let nextPage = 1;
  let fetchedCount = 0;
  let inFlight = false;

  // 保留服务端顺序；失败不推进页号，重试继续读取当前页。
  async function load() {
    if (inFlight || !hasMore.value || controller.signal.aborted) return;
    inFlight = true;
    loading.value = true;
    error.value = false;
    try {
      const data = await fetchPage(nextPage, pageSize, {
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const ids = new Set(items.value.map((item) => item.id));
      const newItems = data.list.filter((item) => !ids.has(item.id));
      if (!newItems.length && fetchedCount < Number(data.total)) {
        throw new Error("分页数据不完整");
      }
      items.value.push(...newItems);
      fetchedCount += data.list.length;
      hasMore.value = fetchedCount < Number(data.total);
      nextPage += 1;
    } catch {
      if (!controller.signal.aborted) error.value = true;
    } finally {
      loading.value = false;
      inFlight = false;
    }
  }

  onMounted(load);
  onBeforeUnmount(() => controller.abort());

  return { items, loading, error, hasMore, load };
}
