import { ref, onMounted } from "vue";

export const usePagination = (fetchApi, defaultPageSize) => {
  const list = ref([]);
  const page = ref(1);
  const pageSize = ref(defaultPageSize);
  const total = ref(0);
  const loading = ref(true);
  const loadingMore = ref(false);
  const hasMore = ref(true);

  const fetchData = async (isLoadMore = false) => {
    try {
      // 设置加载状态
      if (isLoadMore) {
        loadingMore.value = true;
      } else {
        loading.value = true;
      }

      // 调用传入的 API 函数
      const data = await fetchApi(page.value, pageSize.value);
      total.value = data.total;

      // 更新列表数据
      if (isLoadMore) {
        list.value.push(...data.list);
      } else {
        list.value = data.list;
      }

      // 判断是否还有更多数据
      hasMore.value = list.value.length < data.total;
    } catch (error) {
      console.error("数据请求失败：", error);
    } finally {
      // 重置加载状态
      loading.value = false;
      loadingMore.value = false;
    }
  };

  const loadMore = async () => {
    if (loadingMore.value) return;
    page.value += 1;
    await fetchData(true);
  };

  onMounted(fetchData);

  return {
    list,
    page,
    pageSize,
    total,
    loading,
    loadingMore,
    hasMore,
    fetchData,
    loadMore,
  };
};
