<template>
  <div
    class="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#050505] dark:text-slate-100 rounded-3xl"
  >
    <!-- Background Elements -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <!-- Minimalist Grid -->
      <div
        class="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style="
          background-image:
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 64px 64px;
        "
      />

      <!-- Aurora Glows (Subtle) -->
      <div
        class="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-sky-400/10 blur-[120px] dark:bg-sky-500/10"
      />
      <div
        class="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-400/10 blur-[120px] dark:bg-fuchsia-500/10"
      />

      <!-- Noise Texture -->
      <div class="noise absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" />
    </div>

    <!-- Hero Section -->
    <section
      class="relative mx-auto flex min-h-screen max-w-7xl items-start px-4 py-12 sm:px-6 lg:items-center lg:px-12 lg:py-20"
    >
      <div class="grid w-full gap-10 lg:grid-cols-12 lg:gap-8">
        <!-- Left Content -->
        <div class="flex flex-col justify-center lg:col-span-6 xl:col-span-7">
          <!-- Status Badge -->
          <div
            class="group mb-8 w-fit inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/40 px-4 py-1.5 text-xs font-medium tracking-wide shadow-sm backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              />
              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
              />
            </span>
            <span
              class="text-slate-600 dark:text-slate-300 uppercase tracking-widest"
            >
              Online · Building
            </span>
          </div>

          <!-- Main Title -->
          <div class="space-y-4">
            <h1
              class="text-[2.2rem] font-black leading-[1.1] tracking-tight sm:text-[4.5rem] lg:text-[5rem]"
            >
              <span
                class="bg-gradient-to-br from-sky-500 to-indigo-500 bg-clip-text text-transparent"
                >春天熊</span
              >
              <span
                class="mx-2 text-[2rem] font-medium text-slate-400 sm:text-[3rem]"
                >の</span
              >
              <span class="text-slate-800 dark:text-slate-100">知行录</span>
            </h1>

            <p
              class="max-w-2xl text-lg font-medium tracking-wide text-slate-500 dark:text-slate-400 sm:text-2xl"
            >
              代码构建世界，文字安放灵魂
            </p>
          </div>

          <!-- Descriptions (Scrollable Faded Mask for Premium Layout) -->
          <div
            class="fade-mask relative mt-6 h-[220px] w-full max-w-full sm:h-[240px] sm:max-w-2xl"
          >
            <div
              class="custom-scrollbar h-full space-y-4 overflow-y-auto pb-12 pr-4 pt-2"
            >
              <div
                v-for="(item, index) in descriptions"
                :key="index"
                class="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all hover:bg-white/50 hover:shadow-sm dark:hover:border-white/5 dark:hover:bg-white/[0.02]"
              >
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg shadow-inner dark:bg-white/5"
                >
                  {{ item.emoji }}
                </div>
                <p
                  class="break-words pt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {{ item.text }}
                </p>
              </div>
            </div>
          </div>

          <!-- Explore -->
          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://lab.springxiong.cn/tiny-desk/#/sites?category=portfolio"
              target="_blank"
              class="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:border-sky-400/40 dark:hover:bg-sky-500/10"
            >
              <!-- glow -->
              <div
                class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div
                  class="absolute -inset-[120%] animate-[spin_8s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>

              <div class="relative flex items-center gap-4">
                <!-- icon -->
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                >
                  <i class="fa-solid fa-compass text-base" />
                </div>

                <!-- content -->
                <div class="min-w-0 flex-1">
                  <div
                    class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
                  >
                    我的作品
                  </div>
                </div>

                <!-- arrow -->
                <i
                  class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-500"
                />
              </div>
            </a>

            <a
              href="https://springbear.blog.csdn.net"
              target="_blank"
              class="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:border-red-400/40 dark:hover:bg-red-500/10"
            >
              <!-- glow -->
              <div
                class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div
                  class="absolute -inset-[120%] animate-[spin_8s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>

              <div class="relative flex items-center gap-4">
                <!-- icon -->
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                >
                  <i class="fa-solid fa-code text-base" />
                </div>

                <!-- content -->
                <div class="min-w-0 flex-1">
                  <div
                    class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
                  >
                    技术博客
                  </div>
                </div>

                <!-- arrow -->
                <i
                  class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-500"
                />
              </div>
            </a>

            <a
              href="https://github.com/springxiong2020"
              target="_blank"
              class="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/10"
            >
              <!-- glow -->
              <div
                class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div
                  class="absolute -inset-[120%] animate-[spin_8s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>

              <div class="relative flex items-center gap-4">
                <!-- icon -->
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-slate-950"
                >
                  <i class="fa-brands fa-github text-lg" />
                </div>

                <!-- content -->
                <div class="min-w-0 flex-1">
                  <div
                    class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"
                  >
                    开源项目
                  </div>
                </div>

                <!-- arrow -->
                <i
                  class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700 dark:group-hover:text-white"
                />
              </div>
            </a>
          </div>
        </div>

        <!-- Right Content: Terminal Window -->
        <div
          class="relative flex items-center justify-center lg:col-span-6 xl:col-span-5"
        >
          <div
            class="animate-float relative w-full max-w-full overflow-hidden sm:max-w-lg perspective-1000"
          >
            <!-- Terminal Container -->
            <div
              class="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0A0A0A]/80 dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <!-- Window Header -->
              <div
                class="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div class="flex gap-2">
                  <div class="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm" />
                  <div class="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                  <div class="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm" />
                </div>
                <div
                  class="text-[11px] font-medium tracking-wider text-slate-400 dark:text-slate-500"
                >
                  springxiong — zsh
                </div>
                <div class="w-12"></div>
                <!-- Spacer for perfect centering -->
              </div>

              <!-- Window Body -->
              <div class="space-y-4 p-3 font-mono text-xs sm:p-6 sm:text-sm">
                <!-- Command 1 -->
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2">
                    <span class="text-indigo-500 dark:text-indigo-400">➜</span>
                    <span class="text-sky-500 dark:text-sky-400">~</span>
                    <span class="text-slate-700 dark:text-slate-200"
                      >whoami</span
                    >
                  </div>
                  <div class="pl-6 text-slate-500 dark:text-slate-400">
                    Spring-_-Xiong · Full Stack Developer
                  </div>
                </div>

                <!-- Command 2 -->
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-indigo-500 dark:text-indigo-400">➜</span>
                    <span class="text-sky-500 dark:text-sky-400">~</span>
                    <span class="text-slate-700 dark:text-slate-200"
                      >cat skills.json</span
                    >
                  </div>
                  <div class="pl-6">
                    <pre
                      class="overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-slate-100 bg-slate-50 p-3 text-[12px] leading-relaxed sm:p-4 sm:text-[13px] dark:border-white/5 dark:bg-black/30"
                    ><span
                      class="text-slate-400">{</span>
  <span class="text-sky-600 dark:text-sky-300">"frontend"</span><span class="text-slate-400">:</span> [<span
                        class="text-emerald-600 dark:text-emerald-300">"Vue"</span>, <span
                        class="text-emerald-600 dark:text-emerald-300">"Tailwind"</span>],
  <span class="text-sky-600 dark:text-sky-300">"backend"</span><span class="text-slate-400">:</span>  [<span
                        class="text-emerald-600 dark:text-emerald-300">"Go"</span>, <span
                        class="text-emerald-600 dark:text-emerald-300">"Java"</span>],
  <span class="text-sky-600 dark:text-sky-300">"database"</span><span class="text-slate-400">:</span> [<span
                        class="text-emerald-600 dark:text-emerald-300">"MySQL"</span>, <span
                        class="text-emerald-600 dark:text-emerald-300">"Redis"</span>],
  <span class="text-sky-600 dark:text-sky-300">"interest"</span><span class="text-slate-400">:</span> [<span
                        class="text-emerald-600 dark:text-emerald-300">"Reading"</span>, <span
                        class="text-emerald-600 dark:text-emerald-300">"Writing"</span>]
<span class="text-slate-400">}</span></pre>
                  </div>
                </div>

                <!-- Command 3 -->
                <div class="space-y-1.5 pt-2">
                  <div class="flex items-center gap-2">
                    <span class="text-indigo-500 dark:text-indigo-400">➜</span>
                    <span class="text-sky-500 dark:text-sky-400">~</span>
                    <span class="text-slate-700 dark:text-slate-200"
                      >git status</span
                    >
                  </div>
                  <div class="pl-6 text-fuchsia-600 dark:text-fuchsia-400">
                    On branch future/main
                  </div>
                  <div class="pl-6 text-slate-500 dark:text-slate-400">
                    Your life is still being written<span class="animate-pulse"
                      >_</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Tags Bottom -->
            <div class="mt-6 flex flex-wrap justify-center gap-2 px-4">
              <span
                v-for="tag in tags"
                :key="tag"
                class="rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-slate-500 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const descriptions = [
  {
    emoji: "🎉",
    text: "来了，欢迎，终于等到你！这里没有 996，只有书墨香和偶现的 debug 警告（尴尬已被捕获）",
  },
  {
    emoji: "🐻",
    text: "我是春天熊，活力如春，坚毅如熊。写代码如写情书的程序员，GitHub 主页比朋友圈更有料",
  },
  {
    emoji: "💻",
    text: "白天用代码编织银河系帝国，深夜用海明威式文风写技术博客。是的，我管这叫赛博人格分裂",
  },
  {
    emoji: "📸",
    text: "镜头里藏着两个平行宇宙：代码构建的精密星图和生活中跳动的烟火气，如魔幻广场舞晚霞版",
  },
  {
    emoji: "📚",
    text: "书架上演《百年孤独》VS《代码整洁之道》：一个说要魔幻，一个说要重构，最后判定我加班",
  },
  {
    emoji: "🎾",
    text: "羽毛球拍的杀球弧线比函数调用栈更加优雅，但接不住老妈「再不找对象就断线」的致命扣杀",
  },
  {
    emoji: "🌌",
    text: "人生新版本开发中：用编程重写 18 岁的莽撞，用笔尖勾画周末的诗意，用相机定格人间的美好",
  },
  {
    emoji: "💌",
    text: '写给未来的小情话：git commit -m "心跳算法优化：新增并行线程处理星海、远方和你的微笑"',
  },
];

const tags = [
  "Go",
  "Java",
  "Vue",
  "Reading",
  "Writing",
  "Poem",
  "Badminton",
  "Photography",
];
</script>

<style scoped>
/* 噪点纹理，增加页面质感 */
.noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z'/%3E%3C/g%3E%3C/svg%3E");
}

/* 渐变遮罩：让滚动区域的顶部和底部呈现淡出效果 */
.fade-mask {
  -webkit-mask-image: -webkit-linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 85%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 85%,
    transparent 100%
  );

  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* 细腻的自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
}

/* 缓动悬浮动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.animate-float {
  animation: float 7s ease-in-out infinite;
}
</style>
