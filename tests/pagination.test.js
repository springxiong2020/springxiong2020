import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { h } from "vue";
import { createPinia } from "pinia";
import { createMemoryHistory, createRouter, RouterView } from "vue-router";
import Blog from "@/views/blog/index.vue";
import Project from "@/views/project/index.vue";
import Book from "@/views/book/index.vue";
import Sentence from "@/views/sentence/index.vue";
import Archive from "@/views/archive/index.vue";
import * as api from "@/api/mine.js";
import { deferred } from "./helpers.js";

vi.mock("@/api/mine.js", () => ({
  getMineBlogsList: vi.fn(),
  getMineProjectsList: vi.fn(),
  getMineBooksList: vi.fn(),
  getMineSentencesList: vi.fn(),
  getMineArchivesList: vi.fn(),
}));

let wrapper;
beforeEach(() => Object.values(api).forEach((fn) => fn.mockReset()));
afterEach(() => wrapper?.unmount());

async function render(Page) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: Page }],
  });
  await router.push("/");
  wrapper = mount(
    { render: () => h(RouterView) },
    {
      global: {
        plugins: [router, createPinia()],
        stubs: {
          ProjectEntry: true,
          ProjectSkeleton: true,
          BookEntry: true,
          ArchiveEntry: true,
          SentenceDetailModal: true,
          CopyOriginalButton: true,
        },
      },
    },
  );
  await flushPromises();
}
const button = (text) => wrapper.findAll("button").find((item) => item.text().includes(text));
const record = (id) => ({ id, title: `条目 ${id}`, content: `正文 ${id}` });

for (const [name, Page, fetchPage] of [
  ["博客", Blog, api.getMineBlogsList],
  ["项目", Project, api.getMineProjectsList],
  ["书籍", Book, api.getMineBooksList],
  ["诗文", Sentence, api.getMineSentencesList],
  ["文藏", Archive, api.getMineArchivesList],
]) {
  describe(`${name}分页`, () => {
    it("跨页去重并保留顺序，重复页失败后仍重试原页", async () => {
      fetchPage.mockResolvedValueOnce({
        total: 5,
        list: [record(2), record(1)],
      });
      await render(Page);
      fetchPage.mockResolvedValueOnce({ total: 5, list: [record(1)] });
      await button("加载更多").trigger("click");
      await flushPromises();
      expect(wrapper.find('[role="alert"]').exists()).toBe(true);
      expect(wrapper.text()).toContain("已加载 2");

      fetchPage.mockResolvedValueOnce({
        total: 5,
        list: [record(1), record(3), record(4)],
      });
      await button("重新加载").trigger("click");
      await flushPromises();
      expect(fetchPage.mock.calls.map(([page]) => page)).toEqual([1, 2, 2]);
      expect(wrapper.text()).toContain("已加载 4");
      expect(wrapper.find('[role="alert"]').exists()).toBe(false);
      expect(button("加载更多")).toBeUndefined();
    });

    it("只加载首屏一页，失败保留内容并重试同页，末页停止", async () => {
      fetchPage.mockResolvedValueOnce({
        total: 3,
        list: [record(2), record(1)],
      });
      await render(Page);
      expect(fetchPage).toHaveBeenCalledTimes(1);
      const [page, size, options] = fetchPage.mock.calls[0];
      expect(page).toBe(1);
      expect(size).toBeGreaterThan(0);
      expect(options.signal.aborted).toBe(false);
      expect(wrapper.text()).toContain("已加载 2");
      const next = deferred();
      fetchPage.mockReturnValueOnce(next.promise);
      const more = button("加载更多");
      await more.trigger("click");
      // 包括程序触发重复点击时，组件的并发保护也应有效。
      await more.trigger("click");
      expect(fetchPage).toHaveBeenCalledTimes(2);
      next.reject(new Error("offline"));
      await flushPromises();
      expect(wrapper.find('[role="alert"]').exists()).toBe(true);
      expect(wrapper.text()).toContain("已加载 2");
      fetchPage.mockResolvedValueOnce({ total: 3, list: [record(3)] });
      await button("重新加载").trigger("click");
      await flushPromises();
      expect(fetchPage.mock.calls.map(([page]) => page)).toEqual([1, 2, 2]);
      expect(fetchPage.mock.calls.map(([, count]) => count)).toEqual([size, size, size]);
      expect(wrapper.text()).toContain("已加载 3");
      expect(wrapper.find('[role="alert"]').exists()).toBe(false);
      expect(button("加载更多")).toBeUndefined();
    });

    it("空列表正常结束，卸载取消未完成请求并忽略迟到结果", async () => {
      fetchPage.mockResolvedValueOnce({ total: 0, list: [] });
      await render(Page);
      expect(wrapper.find('[role="alert"]').exists()).toBe(false);
      expect(button("加载更多")).toBeUndefined();
      wrapper.unmount();
      const request = deferred();
      fetchPage.mockReturnValueOnce(request.promise);
      await render(Page);
      const signal = fetchPage.mock.calls[1][2].signal;
      wrapper.unmount();
      expect(signal.aborted).toBe(true);
      request.resolve({ total: 1, list: [record(1)] });
      await flushPromises();
      expect(fetchPage).toHaveBeenCalledTimes(2);
    });
  });
}
