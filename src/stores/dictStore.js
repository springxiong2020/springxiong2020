import { defineStore } from "pinia";
import { getDictMap } from "@/api/dict";

export const useDictStore = defineStore("dict", {
  state: () => ({
    blogCategory: {},
    blogTag: {},
    sentenceCategory: {},
    loaded: false, // 标记：是否已经请求过
  }),

  actions: {
    async initDict() {
      if (this.loaded) return;

      try {
        // 并行请求分类、标签
        const [blogCategory, blogTag, sentenceCategory] = await Promise.all([
          getDictMap("csdn_blog_category"),
          getDictMap("csdn_blog_tag"),
          getDictMap("sentence_category"),
        ]);
        this.blogCategory = blogCategory;
        this.blogTag = blogTag;
        this.sentenceCategory = sentenceCategory;
        this.loaded = true; // 标记加载完成
      } catch (err) {
        console.error("字典请求失败", err);
      }
    },
  },
});
