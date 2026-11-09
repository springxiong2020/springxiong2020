import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getDictMap } from "@/api/dict";

const dictNames = {
  blogCategory: "csdn_blog_category",
  blogTag: "csdn_blog_tag",
  sentenceCategory: "sentence_category",
};

export const useDictStore = defineStore("dict", () => {
  // model
  const blogCategory = ref({});
  const blogTag = ref({});
  const sentenceCategory = ref({});
  const dictionaries = { blogCategory, blogTag, sentenceCategory };

  // status
  const status = reactive(
    Object.fromEntries(
      Object.keys(dictNames).map((key) => [key, { loaded: false, loading: false, error: false }]),
    ),
  );
  const loaded = computed(() => Object.values(status).every((item) => item.loaded));
  const loading = computed(() => Object.values(status).some((item) => item.loading));
  const hasErrors = computed(() => Object.values(status).some((item) => item.error));

  // 每个 Store 实例共享当前任务，Promise 不进入响应式状态。
  let inFlight = null;
  function initDict() {
    if (inFlight) return inFlight;
    if (loaded.value) return Promise.resolve();

    inFlight = Promise.all(
      Object.entries(dictNames)
        .filter(([key]) => !status[key].loaded)
        .map(async ([key, dictName]) => {
          const state = status[key];
          state.loading = true;
          try {
            const data = await getDictMap(dictName);
            if (!data || typeof data !== "object" || Array.isArray(data)) {
              throw new Error("字典数据格式错误");
            }
            dictionaries[key].value = data;
            state.loaded = true;
            state.error = false;
          } catch {
            state.error = true;
          } finally {
            state.loading = false;
          }
        }),
    ).finally(() => {
      inFlight = null;
    });
    return inFlight;
  }

  return {
    blogCategory,
    blogTag,
    sentenceCategory,
    status,
    loaded,
    loading,
    hasErrors,
    initDict,
  };
});
