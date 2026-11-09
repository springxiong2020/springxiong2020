import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { reactive } from "vue";
import Home from "@/views/home/index.vue";
import HomeSection from "@/views/home/components/HomeSection.vue";
import { useHomeFeed } from "@/composables/useHomeFeed.js";

vi.mock("@/composables/useHomeFeed.js", () => ({ useHomeFeed: vi.fn() }));
let sections;
let wrapper;
let load;
beforeEach(() => {
  sections = reactive(
    Object.fromEntries(
      ["projects", "blogs", "books", "sentences"].map((key) => [
        key,
        { loading: true, error: false, items: [] },
      ]),
    ),
  );
  load = vi.fn();
  vi.mocked(useHomeFeed).mockReturnValue({ sections, load });
  wrapper = mount(Home, {
    global: {
      stubs: { RouterLink: RouterLinkStub, SentenceDetailModal: true },
    },
  });
});
afterEach(() => wrapper.unmount());
const poemSection = () =>
  wrapper.findAllComponents(HomeSection).find((section) => section.props("title") === "一则诗词");

describe("首页近况与阅读分区", () => {
  it("近况不依赖阅读接口，底部保留独立的书籍与诗词内容", async () => {
    const focus = wrapper.get('aside[aria-labelledby="current-focus-title"]');
    expect(focus.text()).toContain("最近在做");
    expect(focus.find('[aria-busy="true"]').exists()).toBe(false);
    sections.books.items = [{ id: 1, title: "书名" }];
    sections.books.loading = false;
    const poem = {
      id: 2,
      title: "长诗",
      author: "作者",
      content: "完整诗句。".repeat(100),
    };
    sections.sentences.items = [poem];
    sections.sentences.loading = false;
    await wrapper.vm.$nextTick();
    expect(focus.text()).not.toContain("书名");
    expect(focus.text()).not.toContain("长诗");
    expect(wrapper.text()).toContain("书名");
    expect(poemSection().text()).toContain("长诗");
    await poemSection().get("button").trigger("click");
    const modal = wrapper.findComponent({ name: "SentenceDetailModal" });
    expect(modal.props("visible")).toBe(true);
    expect(modal.props("sentence").content).toBe(poem.content);
  });

  it("底部诗词失败可独立重试，空数据展示空状态", async () => {
    sections.sentences.loading = false;
    sections.sentences.error = true;
    await wrapper.vm.$nextTick();
    expect(poemSection().text()).toContain("暂时加载失败");
    await poemSection().get("button").trigger("click");
    expect(load).toHaveBeenCalledWith("sentences");
    sections.sentences.loading = true;
    sections.sentences.error = false;
    await wrapper.vm.$nextTick();
    expect(poemSection().text()).toContain("正在加载一则诗词");
    sections.sentences.loading = false;
    await wrapper.vm.$nextTick();
    expect(poemSection().text()).toContain("暂时没有内容");
  });

  it("已有内容在重新加载或失败时不会被 Skeleton 替换", async () => {
    const state = reactive({
      loading: false,
      error: false,
      items: [{ id: 1, title: "已加载内容" }],
    });
    const section = mount(HomeSection, {
      props: { title: "测试", to: "/books", state },
      slots: { default: ({ items }) => items[0].title },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    try {
      state.loading = true;
      await section.vm.$nextTick();
      expect(section.text()).toContain("已加载内容");
      expect(section.find('[aria-busy="true"]').exists()).toBe(false);
      state.loading = false;
      state.error = true;
      await section.vm.$nextTick();
      expect(section.text()).toContain("已加载内容");
    } finally {
      section.unmount();
    }
  });
});
