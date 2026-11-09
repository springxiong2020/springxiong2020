import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope } from "vue";
import { flushPromises } from "@vue/test-utils";
import { useGlobalSearch } from "@/composables/useGlobalSearch.js";
import { searchMineResources } from "@/api/mine.js";
import { deferred } from "./helpers.js";

vi.mock("@/api/mine.js", () => ({ searchMineResources: vi.fn() }));
let scope;
let search;
beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(searchMineResources).mockReset();
  scope = effectScope();
  search = scope.run(useGlobalSearch);
  search.open();
});
afterEach(() => {
  scope.stop();
  vi.useRealTimers();
});

describe("全局搜索", () => {
  it("输入防抖，只发送最终关键词，空白不发请求", async () => {
    vi.mocked(searchMineResources).mockResolvedValue([]);
    search.keyword.value = "V";
    await vi.advanceTimersByTimeAsync(200);
    search.keyword.value = " Vue ";
    await vi.advanceTimersByTimeAsync(299);
    expect(searchMineResources).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(searchMineResources).toHaveBeenCalledTimes(1);
    expect(searchMineResources).toHaveBeenCalledWith("Vue", {
      signal: expect.any(AbortSignal),
    });
    search.keyword.value = "   ";
    await vi.advanceTimersByTimeAsync(300);
    expect(searchMineResources).toHaveBeenCalledTimes(1);
  });

  it("旧请求即使忽略取消并晚返回，也不能覆盖新结果", async () => {
    const old = deferred();
    const current = deferred();
    vi.mocked(searchMineResources)
      .mockReturnValueOnce(old.promise)
      .mockReturnValueOnce(current.promise);
    search.keyword.value = "旧关键词";
    await vi.advanceTimersByTimeAsync(300);
    const signal = searchMineResources.mock.calls[0][1].signal;
    search.keyword.value = "新关键词";
    expect(signal.aborted).toBe(true);
    await vi.advanceTimersByTimeAsync(300);
    current.resolve([{ id: 2, title: "新结果" }]);
    await flushPromises();
    old.resolve([{ id: 1, title: "过期结果" }]);
    await flushPromises();
    expect(search.results.value).toEqual([{ id: 2, title: "新结果" }]);
    expect(search.loading.value).toBe(false);
    expect(search.error.value).toBeNull();
  });

  it("失败后可重试相同关键词", async () => {
    vi.mocked(searchMineResources)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce([{ id: 1 }]);
    search.keyword.value = "Vue";
    await vi.advanceTimersByTimeAsync(300);
    expect(search.error.value).toBeInstanceOf(Error);
    expect(search.loading.value).toBe(false);
    search.retry();
    await vi.advanceTimersByTimeAsync(300);
    expect(searchMineResources).toHaveBeenCalledTimes(2);
    expect(search.results.value).toEqual([{ id: 1 }]);
    expect(search.error.value).toBeNull();
  });

  it("关闭和销毁会取消任务，迟到结果不能重新填充弹窗", async () => {
    const request = deferred();
    vi.mocked(searchMineResources).mockReturnValue(request.promise);
    search.keyword.value = "Vue";
    await vi.advanceTimersByTimeAsync(300);
    const signal = searchMineResources.mock.calls[0][1].signal;
    search.close();
    expect(signal.aborted).toBe(true);
    request.resolve([{ id: 1 }]);
    await flushPromises();
    expect(search.results.value).toEqual([]);
    expect(search.visible.value).toBe(false);
    search.open();
    search.keyword.value = "不会发出";
    scope.stop();
    await vi.advanceTimersByTimeAsync(300);
    expect(searchMineResources).toHaveBeenCalledTimes(1);
  });
});
