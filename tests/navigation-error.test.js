import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import { deferred } from "./helpers.js";

vi.mock("@/stores/dictStore.js", () => ({
  useDictStore: () => ({ initDict: vi.fn() }),
}));
vi.mock("@/components/layout/PageHeader.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/layout/PageFooter.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/modal/GlobalSearchModal.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/GlobalLoading.vue", () => ({
  default: {
    props: ["isLoading"],
    template: '<div v-if="isLoading" data-loading>加载中</div>',
  },
}));

let wrapper;
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  wrapper?.unmount();
  vi.useRealTimers();
});

async function render(loader) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<h1>首页</h1>" } },
      { path: "/blogs", component: loader },
      { path: "/books", component: { template: "<h1>书架</h1>" } },
    ],
  });
  await router.push("/");
  wrapper = mount(App, { global: { plugins: [router] } });
  return router;
}

describe("路由加载失败恢复", () => {
  it("首次直接进入异步页面失败时，也提供恢复入口", async () => {
    const request = deferred();
    const history = createMemoryHistory();
    history.replace("/blogs");
    const router = createRouter({
      history,
      routes: [{ path: "/blogs", component: () => request.promise }],
    });
    wrapper = mount(App, { global: { plugins: [router] } });
    const ready = router.isReady().catch(() => {});
    await flushPromises();
    await vi.advanceTimersByTimeAsync(300);
    expect(wrapper.find("[data-loading]").exists()).toBe(true);
    request.reject(new Error("initial chunk failed"));
    await ready;
    await flushPromises();
    expect(wrapper.find("[data-loading]").exists()).toBe(false);
    expect(wrapper.get('[role="alert"]').text()).toContain("重试打开页面");
  });

  it("慢请求失败后移除加载层，重试原完整地址成功", async () => {
    const request = deferred();
    const loader = vi
      .fn()
      .mockReturnValueOnce(request.promise)
      .mockResolvedValue({ template: "<h1>博客</h1>" });
    const router = await render(loader);
    // 导航拒绝需要在触发前绑定处理，模拟 RouterLink 的行为。
    const navigation = router.push("/blogs?page=2#entry").catch(() => {});
    await flushPromises();
    await vi.advanceTimersByTimeAsync(300);
    expect(wrapper.find("[data-loading]").exists()).toBe(true);
    request.reject(new Error("chunk unavailable"));
    await navigation;
    await flushPromises();
    expect(wrapper.find("[data-loading]").exists()).toBe(false);
    expect(wrapper.get('[role="alert"]').text()).toContain("页面加载失败");
    expect(wrapper.get("main").text()).toContain("首页");
    await wrapper.get('[role="alert"] button').trigger("click");
    await flushPromises();
    expect(loader).toHaveBeenCalledTimes(2);
    expect(router.currentRoute.value.fullPath).toBe("/blogs?page=2#entry");
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.get("main").text()).toContain("博客");
  });

  it("快速失败会取消延迟计时器，重复失败仍可恢复导航", async () => {
    const loader = vi.fn().mockRejectedValue(new Error("offline"));
    const router = await render(loader);
    await router.push("/blogs").catch(() => {});
    await wrapper.vm.$nextTick();
    await wrapper.get('[role="alert"] button').trigger("click");
    await flushPromises();
    await vi.advanceTimersByTimeAsync(1000);
    expect(loader).toHaveBeenCalledTimes(2);
    expect(wrapper.find("[data-loading]").exists()).toBe(false);
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    await router.push("/books");
    await flushPromises();
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.get("main").text()).toContain("书架");
  });

  it("旧导航晚失败，不结束新导航的加载或显示旧错误", async () => {
    const old = deferred();
    const router = await render(() => old.promise);
    const current = deferred();
    router.addRoute({ path: "/slow", component: () => current.promise });
    const first = router.push("/blogs").catch(() => {});
    await flushPromises();
    const second = router.push("/slow");
    await flushPromises();
    await vi.advanceTimersByTimeAsync(300);
    old.reject(new Error("old chunk failed"));
    await first;
    await flushPromises();
    expect(wrapper.find("[data-loading]").exists()).toBe(true);
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    current.resolve({ template: "<h1>新页面</h1>" });
    await second;
    await flushPromises();
    expect(wrapper.find("[data-loading]").exists()).toBe(false);
    expect(wrapper.get("main").text()).toContain("新页面");
  });

  it("卸载移除路由回调并取消计时器", async () => {
    const router = await render(() => Promise.reject(new Error("offline")));
    const detachedErrorHandler = vi.fn();
    router.onError(detachedErrorHandler);
    wrapper.unmount();
    await router.push("/blogs").catch(() => {});
    expect(detachedErrorHandler).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });
});
