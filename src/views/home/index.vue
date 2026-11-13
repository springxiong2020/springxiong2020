<template>
  <div class="home-page text-slate-800 dark:text-slate-100 mx-auto max-w-7xl pb-8">
    <section
      class="grid items-center gap-8 pt-3 pb-10 sm:grid-cols-2 sm:gap-8 sm:pt-6 sm:pb-10 lg:grid-cols-[1.2fr_1fr] lg:gap-4 lg:pt-10 lg:pb-14"
      aria-labelledby="intro-title"
    >
      <home-intro />
      <home-focus />
    </section>

    <div
      class="flex flex-col gap-10 border-t border-slate-200 dark:border-slate-700 pt-7 sm:gap-16 sm:pt-10"
    >
      <!-- 实践成果 -->
      <home-section
        title="实践成果"
        description="把想法写成代码，把代码变成可以使用的作品"
        more-label="开源项目"
        to="/projects"
        :state="sections.projects"
        @retry="load('projects')"
      >
        <template #loading>
          <home-project-skeleton />
        </template>
        <template #default="{ items }">
          <div class="grid gap-5 md:grid-cols-3 md:gap-6">
            <home-project-entry v-for="project in items" :key="project.id" :project="project" />
          </div>
        </template>
      </home-section>

      <!-- 开发手记 -->
      <home-section
        title="开发手记"
        description="开发中的思考、实践，以及值得记录的问题"
        more-label="技术博客"
        to="/blogs"
        :state="sections.blogs"
        @retry="load('blogs')"
      >
        <template #loading>
          <home-blog-skeleton />
        </template>
        <template #default="{ items }">
          <ul class="grid gap-x-12 md:grid-cols-2">
            <home-blog-entry v-for="blog in items" :key="blog.id" :blog="blog" />
          </ul>
        </template>
      </home-section>

      <div class="grid items-stretch gap-7 lg:grid-cols-2">
        <!-- 书页之间 -->
        <home-section
          class="home-reading home-reading-book min-w-0 rounded-3xl p-5 sm:p-6"
          title="书页之间"
          description="读过的书，划下的句子"
          to="/books"
          more-label="读书札记"
          empty-text="还没有读完的书籍记录"
          :state="sections.books"
          @retry="load('books')"
        >
          <template #loading>
            <home-book-skeleton />
          </template>
          <template #default="{ items }">
            <home-book-entry v-for="book in items" :key="book.id" :book="book" />
          </template>
        </home-section>

        <!-- 一则诗词 -->
        <home-section
          class="home-reading home-reading-sentence min-w-0 rounded-3xl p-5 sm:p-6"
          title="一则诗词"
          description="抄过的诗，心动的词句"
          to="/sentences"
          more-label="三五七言"
          :state="sections.sentences"
          @retry="load('sentences')"
        >
          <template #loading>
            <home-sentence-skeleton />
          </template>
          <template #default="{ items }">
            <home-sentence-entry
              v-for="sentence in items"
              :key="sentence.id"
              :sentence="sentence"
              @read="openSentence"
            />
          </template>
        </home-section>
      </div>
    </div>

    <sentence-detail-modal
      :visible="modalVisible"
      :sentence="selectedSentence"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { nextTick, onDeactivated, ref } from "vue";
import "./home-colors.css";
import HomeIntro from "./components/HomeIntro.vue";
import HomeFocus from "./components/HomeFocus.vue";
import HomeSection from "./components/HomeSection.vue";
import HomeProjectEntry from "./components/HomeProjectEntry.vue";
import HomeProjectSkeleton from "./components/HomeProjectSkeleton.vue";
import HomeBlogEntry from "./components/HomeBlogEntry.vue";
import HomeBlogSkeleton from "./components/HomeBlogSkeleton.vue";
import HomeBookEntry from "./components/HomeBookEntry.vue";
import HomeBookSkeleton from "./components/HomeBookSkeleton.vue";
import HomeSentenceEntry from "./components/HomeSentenceEntry.vue";
import HomeSentenceSkeleton from "./components/HomeSentenceSkeleton.vue";
import SentenceDetailModal from "@/components/modal/SentenceDetailModal.vue";
import { useHomeFeed } from "@/composables/useHomeFeed";

defineOptions({ name: "HomePage" });

const { sections, load } = useHomeFeed();

const modalVisible = ref(false);
const selectedSentence = ref({});
const openSentence = (sentence, event) => {
  event.currentTarget.focus({ preventScroll: true });
  selectedSentence.value = sentence;
  modalVisible.value = true;
};

onDeactivated(async () => {
  if (!modalVisible.value) return;
  // 导航确认、首页移入缓存后再关闭，避免失败导航提前关闭弹窗。
  modalVisible.value = false;
  await nextTick();
  // 缓存中的触发按钮已脱离文档，将焦点移到新页面的正文入口。
  document.getElementById("main-content")?.focus({ preventScroll: true });
});
</script>
