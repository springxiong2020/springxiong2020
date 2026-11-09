<template>
  <aside
    class="min-w-0 rounded-3xl home-focus-frame p-2 sm:p-3"
    aria-labelledby="current-focus-title"
  >
    <div
      class="rounded-[20px] border border-slate-200/70 bg-white px-5 py-6 shadow-sm sm:px-6 lg:px-7 lg:py-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
    >
      <h2
        id="current-focus-title"
        class="border-b border-slate-200 pb-4 text-lg font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
      >
        最近在做
      </h2>
      <div class="py-6 lg:py-7">
        <p class="text-sm font-medium text-blue-700 dark:text-blue-300">当前重心</p>
        <h3
          class="mt-3 text-2xl font-semibold leading-relaxed tracking-tight text-slate-900 [overflow-wrap:anywhere] dark:text-slate-100"
        >
          {{ currentFocus.primary.title }}
        </h3>
        <p
          class="mt-3 max-w-prose text-sm leading-7 text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300"
        >
          {{ currentFocus.primary.description }}
        </p>
      </div>
      <dl class="space-y-4 border-t border-slate-200 pt-5 text-sm leading-6 dark:border-slate-700">
        <div
          v-for="item in currentFocus.secondary"
          :key="item.label"
          class="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4"
        >
          <dt class="home-muted">
            {{ item.label }}
          </dt>
          <dd class="text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200">
            {{ item.text }}
          </dd>
        </div>
      </dl>
    </div>
  </aside>
</template>

<script setup>
const currentFocus = {
  primary: {
    title: "把个人网站打磨得更好",
    description: "整理首页内容，完善搜索体验，让作品与文字都有舒服的位置。",
  },
  secondary: [
    { label: "也在探索", text: "AI 如何融入日常开发" },
    { label: "持续记录", text: "开发中的问题与解法" },
  ],
};
</script>
