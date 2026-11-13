<template>
  <div class="min-w-0">
    <div class="flex items-center gap-2.5 text-sm home-muted">
      <span
        class="mr-1.5 grid size-[52px] shrink-0 place-items-center rounded-2xl bg-blue-50 dark:bg-slate-800 sm:size-16 sm:rounded-2xl"
        aria-hidden="true"
      >
        <img
          v-if="!avatarBroken"
          :src="logoUrl"
          alt="logo"
          width="64"
          height="64"
          class="size-12 object-contain sm:size-14"
          @error="avatarBroken = true"
        />
        <span v-else class="text-2xl font-bold text-blue-600 dark:text-blue-300">熊</span>
      </span>
      <span
        >来了，欢迎！我是
        <strong class="font-semibold text-slate-800 dark:text-slate-100">SpringXiong</strong></span
      >
    </div>
    <h1 id="intro-title" class="intro-title mt-6 sm:mt-7">
      <span class="intro-title-ink intro-title-name">春天熊</span
      ><span class="intro-title-connector text-slate-500 dark:text-slate-400">の</span
      ><span class="intro-title-ink intro-title-journal">知行录</span>
    </h1>
    <p class="mt-2.5 text-lg leading-relaxed tracking-wide sm:mt-4 sm:text-base lg:text-xl">
      代码构建世界，文字安放灵魂
    </p>
    <div class="mt-5 text-sm leading-loose home-muted sm:mt-6">
      <p>
        用 AI、Go、Java、Python 和 Vue 构建应用，<br
          class="hidden lg:block"
        />也在书页、摄影与运动中，寻找代码之外的灵感。
      </p>
    </div>
    <div
      class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5"
    >
      <a
        :href="portfolio"
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/15 transition-colors hover:bg-blue-700 motion-reduce:transition-none sm:w-auto sm:justify-start sm:pl-3 sm:pr-5 sm:shadow-md dark:bg-blue-400 dark:text-slate-950 dark:shadow-none dark:hover:bg-blue-300"
      >
        <span
          class="grid size-6 shrink-0 place-items-center sm:size-8 sm:rounded-lg sm:bg-white/15 dark:sm:bg-slate-950/10"
        >
          <i class="fa-solid fa-compass text-base" aria-hidden="true"></i>
        </span>
        <span>看看我的个人作品</span>
        <i
          class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs opacity-70 group-hover:opacity-100"
          aria-hidden="true"
        ></i>
        <span class="sr-only">（在新窗口打开）</span>
      </a>
      <nav aria-label="个人平台" class="grid grid-cols-2 gap-3 sm:hidden">
        <a
          v-for="link in personalLinks"
          :key="link.name"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
        >
          <i :class="link.icon" aria-hidden="true"></i>
          {{ link.label }}
          <span class="sr-only">（在新窗口打开）</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { personalLinks } from "@/config.js";

const logoUrl = import.meta.env.VITE_APP_LOGO_URL;
const portfolio = import.meta.env.VITE_APP_PORTFOLIO;

const avatarBroken = ref(false);
</script>

<style scoped>
.intro-title {
  font-size: clamp(2.25rem, 9.5vw, 3.375rem);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.045em;
  white-space: nowrap;
}

.intro-title-ink {
  display: inline-block;
  padding-block: 0.06em;
  color: var(--title-ink);
}

.intro-title-name {
  --title-ink: var(--home-title-name-ink);
  --title-gradient: var(--home-title-name-gradient);
}

.intro-title-journal {
  --title-ink: var(--home-accent);
  --title-gradient: var(--home-title-journal-gradient);
}

.intro-title-connector {
  margin-inline: 0.16em;
  font-size: 0.6em;
  font-weight: 500;
  letter-spacing: 0;
}

@supports (background-clip: text) or (-webkit-background-clip: text) {
  .intro-title-ink {
    background-image: var(--title-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}

@media (min-width: 640px) {
  .intro-title {
    font-size: 2.625rem;
  }
}

@media (min-width: 1024px) {
  .intro-title {
    font-size: clamp(2.5rem, 4.8vw, 4.0625rem);
  }
}

@media (forced-colors: active) {
  .intro-title-ink,
  .intro-title-connector {
    background-image: none;
    color: CanvasText;
  }
}
</style>
