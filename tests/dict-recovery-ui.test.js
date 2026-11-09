import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import Blog from "@/views/blog/index.vue";
import SentenceDetailModal from "@/components/modal/SentenceDetailModal.vue";
import DictionaryErrorNotice from "@/components/notice/DictionaryErrorNotice.vue";
import { useDictStore } from "@/stores/dictStore.js";
import { getDictMap } from "@/api/dict.js";
import { getMineBlogsList } from "@/api/mine.js";
import { deferred } from "./helpers.js";

vi.mock("@/api/dict", () => ({ getDictMap: vi.fn() }));
vi.mock("@/api/mine.js", () => ({ getMineBlogsList: vi.fn() }));

let wrapper;
beforeEach(() => {
  vi.mocked(getDictMap).mockReset();
  vi.mocked(getMineBlogsList).mockReset();
});
afterEach(() => wrapper?.unmount());

async function initialize(failedNames) {
  const pinia = createPinia();
  const store = useDictStore(pinia);
  vi.mocked(getDictMap).mockImplementation(async (name) => {
    if (failedNames.includes(name)) throw new Error("offline");
    return { 1: name === "csdn_blog_category" ? "技术" : "诗词" };
  });
  await store.initDict();
  return { pinia, store };
}

describe("字典失败的界面恢复入口", () => {
  it("博客点击重试更新分类与标签，只请求失败项且不重新读取文章", async () => {
    const { pinia } = await initialize(["csdn_blog_category", "csdn_blog_tag"]);
    vi.mocked(getMineBlogsList).mockResolvedValue({
      total: 1,
      list: [{ id: 1, title: "文章", categoryId: 1, tagId: 1 }],
    });
    wrapper = mount(Blog, { global: { plugins: [pinia] } });
    await flushPromises();
    expect(wrapper.text()).toContain("未分类");
    const notice = wrapper.findComponent(DictionaryErrorNotice);
    expect(notice.text()).toContain("分类或标签暂时加载失败");
    const category = deferred();
    const tag = deferred();
    vi.mocked(getDictMap).mockImplementation((name) =>
      name === "csdn_blog_category" ? category.promise : tag.promise,
    );
    await notice.get("button").trigger("click");
    expect(notice.get("button").attributes("disabled")).toBeDefined();
    expect(notice.text()).toContain("正在加载");
    await notice.get("button").trigger("click");
    expect(getDictMap).toHaveBeenCalledTimes(5);
    category.resolve({ 1: "开发实践" });
    tag.resolve({ 1: "Vue+Go" });
    await flushPromises();
    expect(wrapper.text()).toContain("开发实践");
    expect(wrapper.text()).toContain("Vue");
    expect(wrapper.text()).toContain("Go");
    expect(wrapper.text()).not.toContain("未分类");
    expect(wrapper.find('[role="status"][aria-busy]').exists()).toBe(false);
    expect(getDictMap.mock.calls.map(([name]) => name)).toEqual([
      "csdn_blog_category",
      "csdn_blog_tag",
      "sentence_category",
      "csdn_blog_category",
      "csdn_blog_tag",
    ]);
    expect(getMineBlogsList).toHaveBeenCalledTimes(1);
  });

  it("再次失败仍保留可用重试入口，其他字典错误不出现在当前区域", async () => {
    const { pinia } = await initialize(["csdn_blog_tag"]);
    wrapper = mount(DictionaryErrorNotice, {
      props: { dictionaries: ["sentenceCategory"] },
      global: { plugins: [pinia] },
    });
    expect(wrapper.find("button").exists()).toBe(false);
    await wrapper.setProps({ dictionaries: ["blogTag"], label: "标签" });
    vi.mocked(getDictMap).mockRejectedValue(new Error("still offline"));
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(wrapper.text()).toContain("标签暂时加载失败");
    expect(wrapper.get("button").attributes("disabled")).toBeUndefined();
    expect(getDictMap).toHaveBeenCalledTimes(4);
    vi.mocked(getDictMap).mockResolvedValue({ 1: "Vue" });
    await wrapper.get("button").trigger("click");
    await flushPromises();
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("首页共用的诗词弹窗可恢复分类，成功字典不重复请求", async () => {
    const { pinia } = await initialize(["sentence_category"]);
    wrapper = mount(SentenceDetailModal, {
      attachTo: document.body,
      props: {
        visible: true,
        sentence: { title: "诗词", content: "原文", categoryId: 1 },
      },
      global: { plugins: [pinia] },
    });
    await flushPromises();
    expect(document.querySelector('[role="dialog"]').textContent).toContain("分类信息暂时加载失败");
    vi.mocked(getDictMap).mockResolvedValue({ 1: "唐诗" });
    await wrapper.findComponent(DictionaryErrorNotice).get("button").trigger("click");
    await flushPromises();
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog.textContent).toContain("唐诗");
    expect(dialog.textContent).not.toContain("暂时加载失败");
    expect(getDictMap).toHaveBeenCalledTimes(4);
    expect(getDictMap).toHaveBeenLastCalledWith("sentence_category");
  });
});
