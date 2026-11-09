import { afterEach, describe, expect, it, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { useHomeFeed } from "@/composables/useHomeFeed.js";
import * as api from "@/api/mine.js";
import { deferred } from "./helpers.js";

vi.mock("@/api/mine.js", () => ({
  getMineProjectsList: vi.fn(),
  getMineBlogsList: vi.fn(),
  getMineBooksList: vi.fn(),
  getMineSentencesList: vi.fn(),
}));
let wrapper;
afterEach(() => wrapper?.unmount());

describe("首页按展示数量独立加载", () => {
  it("四组并行读取第一页，失败项可独立重试，成功项沿用服务端顺序", async () => {
    const pending = Object.values(api).map(() => deferred());
    Object.values(api).forEach((fn, index) => {
      fn.mockReset().mockReturnValueOnce(pending[index].promise);
    });
    let feed;
    wrapper = mount({
      setup() {
        feed = useHomeFeed();
        return () => null;
      },
    });
    for (const [fn, size] of [
      [api.getMineProjectsList, 3],
      [api.getMineBlogsList, 4],
      [api.getMineBooksList, 1],
      [api.getMineSentencesList, 1],
    ]) {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1, size, {
        signal: expect.any(AbortSignal),
      });
    }
    const blogIndex = Object.values(api).indexOf(api.getMineBlogsList);
    pending.forEach((task, index) => {
      if (index === blogIndex) task.reject(new Error("offline"));
      else task.resolve({ total: 1000, list: [{ id: 2 }, { id: 1 }] });
    });
    await flushPromises();
    expect(feed.sections.blogs.error).toBe(true);
    expect(feed.sections.projects.items).toEqual([{ id: 2 }, { id: 1 }]);
    api.getMineBlogsList.mockResolvedValueOnce({
      total: 1000,
      list: [{ id: 4 }, { id: 3 }],
    });
    await feed.load("blogs");
    expect(feed.sections.blogs.error).toBe(false);
    expect(feed.sections.blogs.items).toEqual([{ id: 4 }, { id: 3 }]);
    expect(api.getMineBlogsList).toHaveBeenCalledTimes(2);
    expect(api.getMineProjectsList).toHaveBeenCalledTimes(1);
  });
});
