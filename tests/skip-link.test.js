import { afterEach, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "@/App.vue";

vi.mock("@/stores/dictStore.js", () => ({
  useDictStore: () => ({ initDict: vi.fn() }),
}));
vi.mock("@/components/layout/PageHeader.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/layout/PageFooter.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/GlobalLoading.vue", () => ({
  default: { render: () => null },
}));
vi.mock("@/components/modal/GlobalSearchModal.vue", () => ({
  default: { render: () => null },
}));

let wrapper;
afterEach(() => wrapper?.unmount());

it("跳到主要内容将焦点移到 main，保留当前路由与 Hash", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/blogs", component: { template: "<p>正文</p>" } }],
  });
  await router.push("/blogs");
  wrapper = mount(App, {
    attachTo: document.body,
    global: { plugins: [router] },
  });
  const main = wrapper.get("main");
  main.element.scrollIntoView = vi.fn();
  const hash = window.location.hash;
  const skip = wrapper.get(".skip-link");
  skip.element.focus();
  await skip.trigger("click");
  expect(document.activeElement).toBe(main.element);
  expect(main.element.scrollIntoView).toHaveBeenCalledWith({
    behavior: "instant",
    block: "start",
  });
  expect(router.currentRoute.value.fullPath).toBe("/blogs");
  expect(window.location.hash).toBe(hash);
});
