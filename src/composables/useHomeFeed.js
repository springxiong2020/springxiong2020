import { onMounted, onScopeDispose, reactive } from "vue";
import {
  getMineBlogsList,
  getMineBooksList,
  getMineProjectsList,
  getMineSentencesList,
} from "@/api/mine.js";

export function useHomeFeed() {
  const sections = reactive({
    projects: { loading: true, error: false, items: [] },
    blogs: { loading: true, error: false, items: [] },
    books: { loading: true, error: false, items: [] },
    sentences: { loading: true, error: false, items: [] },
  });
  // 服务端按 sortValue 逆序返回，首页仅按展示数量读取第一页。
  const loaders = {
    projects: async (signal) => (await getMineProjectsList(1, 3, { signal })).list.slice(0, 3),
    blogs: async (signal) => (await getMineBlogsList(1, 4, { signal })).list.slice(0, 4),
    books: async (signal) => (await getMineBooksList(1, 1, { signal })).list.slice(0, 1),
    sentences: async (signal) => (await getMineSentencesList(1, 1, { signal })).list.slice(0, 1),
  };
  const controllers = new Map();
  let disposed = false;
  const load = async (key) => {
    if (disposed || controllers.has(key)) return;
    const controller = new AbortController();
    controllers.set(key, controller);
    const state = sections[key];
    state.loading = true;
    state.error = false;
    try {
      const items = await loaders[key](controller.signal);
      if (!disposed) state.items = items;
    } catch {
      if (!disposed && !controller.signal.aborted) state.error = true;
    } finally {
      controllers.delete(key);
      if (!disposed) state.loading = false;
    }
  };
  onMounted(() => {
    Object.keys(sections).forEach(load);
  });
  onScopeDispose(() => {
    disposed = true;
    controllers.forEach((controller) => controller.abort());
    controllers.clear();
  });
  return { sections, load };
}
