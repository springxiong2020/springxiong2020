import { afterEach, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import GlobalSearchModal from "@/components/modal/GlobalSearchModal.vue";

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function openSearch() {
  wrapper = mount(GlobalSearchModal, { attachTo: document.body });
  window.dispatchEvent(new CustomEvent("global-search-open"));
  await flushPromises();
}

it("跟随软键盘可视视口的高度和偏移，关闭及卸载清理监听", async () => {
  const viewport = new EventTarget();
  viewport.height = 700;
  viewport.offsetTop = 0;
  vi.stubGlobal("visualViewport", viewport);
  const remove = vi.spyOn(viewport, "removeEventListener");
  await openSearch();
  const backdrop = () => document.querySelector(".search-backdrop");
  expect(backdrop().style.height).toBe("700px");
  viewport.height = 260;
  viewport.offsetTop = 35;
  viewport.dispatchEvent(new Event("resize"));
  await flushPromises();
  expect(backdrop().style.height).toBe("260px");
  expect(backdrop().style.top).toBe("35px");
  expect(backdrop().style.paddingTop).toBe("26px");
  viewport.offsetTop = 50;
  viewport.dispatchEvent(new Event("scroll"));
  await flushPromises();
  expect(backdrop().style.top).toBe("50px");
  document.querySelector('button[aria-label="关闭搜索"]').click();
  await flushPromises();
  expect(backdrop()).toBeNull();
  expect(remove.mock.calls.map(([type]) => type)).toEqual(["resize", "scroll"]);
  window.dispatchEvent(new CustomEvent("global-search-open"));
  await flushPromises();
  wrapper.unmount();
  expect(remove.mock.calls.map(([type]) => type)).toEqual(["resize", "scroll", "resize", "scroll"]);
});

it("无 visualViewport 时跟随窗口高度，关闭仍恢复滚动", async () => {
  vi.stubGlobal("visualViewport", undefined);
  vi.stubGlobal("innerHeight", 400);
  const originalOverflow = document.body.style.overflow;
  await openSearch();
  expect(document.body.style.overflow).toBe("hidden");
  vi.stubGlobal("innerHeight", 240);
  window.dispatchEvent(new Event("resize"));
  await flushPromises();
  expect(document.querySelector(".search-backdrop").style.height).toBe("240px");
  document.querySelector('button[aria-label="关闭搜索"]').click();
  await flushPromises();
  expect(document.body.style.overflow).toBe(originalOverflow);
});
