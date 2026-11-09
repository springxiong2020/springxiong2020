import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia } from "pinia";
import { flushPromises } from "@vue/test-utils";
import { useDictStore } from "@/stores/dictStore.js";
import { getDictMap } from "@/api/dict.js";
import { deferred } from "./helpers.js";

vi.mock("@/api/dict", () => ({ getDictMap: vi.fn() }));
beforeEach(() => vi.mocked(getDictMap).mockReset());

describe("字典独立加载与恢复", () => {
  it("合并并发初始化，立即提交成功项，重试只请求失败字典", async () => {
    const category = deferred();
    const tag = deferred();
    const sentence = deferred();
    vi.mocked(getDictMap).mockImplementation((name) => {
      return {
        csdn_blog_category: category.promise,
        csdn_blog_tag: tag.promise,
        sentence_category: sentence.promise,
      }[name];
    });
    const store = useDictStore(createPinia());
    const first = store.initDict();
    const duplicate = store.initDict();
    expect(getDictMap).toHaveBeenCalledTimes(3);
    category.resolve({ 1: "技术" });
    tag.reject(new Error("offline"));
    await flushPromises();
    expect(store.blogCategory).toEqual({ 1: "技术" });
    expect(store.status.blogCategory.loaded).toBe(true);
    expect(store.status.blogTag.error).toBe(true);
    expect(store.loading).toBe(true);
    sentence.resolve({ 2: "诗词" });
    await Promise.all([first, duplicate]);
    expect(store.loaded).toBe(false);
    expect(store.hasErrors).toBe(true);
    vi.mocked(getDictMap).mockResolvedValue({ 3: "Vue" });
    await Promise.all([store.initDict(), store.initDict()]);
    expect(getDictMap).toHaveBeenCalledTimes(4);
    expect(getDictMap).toHaveBeenLastCalledWith("csdn_blog_tag");
    expect(store.blogTag).toEqual({ 3: "Vue" });
    expect(store.loaded).toBe(true);
    expect(store.loading).toBe(false);
    expect(store.hasErrors).toBe(false);
    await store.initDict();
    expect(getDictMap).toHaveBeenCalledTimes(4);
  });

  it("异常结构不标记成功，空字典有效，Store 实例互不影响", async () => {
    vi.mocked(getDictMap).mockImplementation(async (name) =>
      name === "csdn_blog_category" ? null : {},
    );
    const store = useDictStore(createPinia());
    await store.initDict();
    expect(store.status.blogCategory.error).toBe(true);
    expect(store.status.blogTag.loaded).toBe(true);
    const another = useDictStore(createPinia());
    vi.mocked(getDictMap).mockResolvedValue({});
    await another.initDict();
    expect(another.loaded).toBe(true);
    expect(store.loaded).toBe(false);
  });
});
