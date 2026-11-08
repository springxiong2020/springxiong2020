<template>
  <div
    class="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#050505] dark:text-slate-100 flex items-center justify-center p-6 rounded-3xl"
  >
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style="
          background-image:
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 64px 64px;
        "
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[100px] dark:bg-indigo-500/10"
      />
      <div class="noise absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" />
    </div>

    <div class="relative z-10 w-full max-w-2xl text-center">
      <div class="relative inline-block animate-float">
        <h1
          class="text-[8rem] font-black tracking-tighter leading-none sm:text-[12rem] bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text text-transparent dark:from-white dark:to-slate-700 opacity-20"
        >
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <p
            class="text-2xl font-bold tracking-[0.2em] uppercase text-sky-500 dark:text-sky-400 drop-shadow-sm"
          >
            Lost in Matrix
          </p>
        </div>
      </div>

      <div class="mt-8 space-y-2">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
          糟糕，这里是荒原
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          春天熊似乎还没把这块星图构建出来，或者页面已经迁徙到了远方。
        </p>
      </div>

      <div
        class="mt-10 overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/80 text-left mx-auto max-w-md"
      >
        <div
          class="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]"
        >
          <div class="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div class="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span
            class="ml-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest"
            >System Error</span
          >
        </div>
        <div
          class="p-5 font-mono text-sm space-y-2 text-slate-600 dark:text-slate-400"
        >
          <div class="flex gap-2">
            <span class="text-indigo-500">➜</span>
            <span class="text-sky-500">~</span>
            <span>locate page_url</span>
          </div>
          <div class="pl-5 text-red-500/80">[Error] 404: FILE_NOT_FOUND</div>
          <div class="flex gap-2">
            <span class="text-indigo-500">➜</span>
            <span class="text-sky-500">~</span>
            <span class="animate-pulse">_</span>
          </div>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <router-link
          to="/"
          class="group flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-400 dark:shadow-sky-500/20"
        >
          <i
            class="fa-solid fa-house-chimney text-base transition-transform group-hover:scale-110"
          />
          返回首页
        </router-link>

        <button
          @click="router.back()"
          class="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white/50 px-8 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <i
            class="fa-solid fa-arrow-left text-base transition-transform group-hover:-translate-x-1"
          />
          返回上页
        </button>
      </div>
    </div>

    <div
      class="absolute bottom-8 text-[10px] font-medium tracking-[0.3em] uppercase text-slate-400 dark:text-slate-600"
    >
      springxiong · Cyber Space Maintenance
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z'/%3E%3C/g%3E%3C/svg%3E");
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(1deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
