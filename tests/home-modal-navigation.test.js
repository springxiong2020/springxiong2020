import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createMemoryHistory, createRouter } from "vue-router";
import Home from "@/views/home/index.vue";
import PageBody from "@/components/layout/PageBody.vue";

vi.mock("@/composables/useHomeFeed", () => ({
  useHomeFeed: () => ({
    sections: {
      projects: { loading: false, error: false, items: [] },
      blogs: { loading: false, error: false, items: [] },
      books: { loading: false, error: false, items: [] },
      sentences: {
        loading: false,
        error: false,
        items: [{ id: 1, title: "测试诗词", content: "诗词正文" }],
      },
    },
    load: vi.fn(),
  }),
}));

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  document.body.style.overflow = "";
});

async function render() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: Home, meta: { keepAlive: true } },
      { path: "/blogs", component: { template: "<h1>博客</h1>" } },
      { path: "/:pathMatch(.*)*", component: { template: "<p>其他页面</p>" } },
    ],
  });
  await router.push("/");
  wrapper = mount(PageBody, {
    attachTo: document.body,
    global: { plugins: [router, createPinia()] },
  });
  await flushPromises();
  return router;
}

async function openPoem() {
  const trigger = wrapper.get('button[aria-haspopup="dialog"]');
  await trigger.trigger("click");
  await flushPromises();
  expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  expect(document.body.style.overflow).toBe("hidden");
  return trigger.element;
}

function expectClosedOnDestination() {
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.body.style.overflow).toBe("auto");
  expect(document.activeElement).toBe(wrapper.get("main").element);
}

describe("首页诗词弹窗与缓存页面导航", () => {
  it("程序导航关闭弹窗、恢复滚动，并将焦点移到新正文", async () => {
    const router = await render();
    const homeId = wrapper.findComponent(Home).vm.$.uid;
    document.body.style.overflow = "auto";
    const trigger = await openPoem();
    await router.push("/blogs");
    await flushPromises();
    expectClosedOnDestination();
    expect(trigger.isConnected).toBe(false);
    expect(wrapper.get("main").text()).toContain("博客");
    await router.push("/");
    await flushPromises();
    expect(wrapper.findComponent(Home).vm.$.uid).toBe(homeId);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it("历史后退和前进离开首页时均关闭弹窗", async () => {
    const router = await render();
    await router.push("/blogs");
    await router.push("/");
    await flushPromises();
    document.body.style.overflow = "auto";
    await openPoem();
    router.back();
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/blogs");
    expectClosedOnDestination();

    router.back();
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/");
    await openPoem();
    router.forward();
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/blogs");
    expectClosedOnDestination();
  });

  it("普通关闭仍恢复触发按钮焦点，取消导航不关闭弹窗", async () => {
    const router = await render();
    document.body.style.overflow = "auto";
    const trigger = await openPoem();
    const removeGuard = router.beforeEach(() => false);
    await router.push("/blogs");
    await flushPromises();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
    removeGuard();
    router.addRoute({
      path: "/broken",
      component: () => Promise.reject(new Error("chunk unavailable")),
    });
    router.onError(() => {});
    await router.push("/broken").catch(() => {});
    await flushPromises();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
    document.querySelector('button[aria-label="关闭诗词详情"]').click();
    await flushPromises();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.style.overflow).toBe("auto");
    expect(document.activeElement).toBe(trigger);
  });
});
