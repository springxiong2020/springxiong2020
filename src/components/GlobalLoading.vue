<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 transition-colors duration-500 dark:bg-[#050505]"
    >
      <!-- Background Ambient Glow -->
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          class="absolute h-[300px] w-[300px] rounded-full bg-sky-400/10 blur-[80px] dark:bg-sky-500/10"
        />
        <div
          class="noise absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        />
      </div>

      <!-- Loading Core -->
      <div class="relative z-10 flex flex-col items-center gap-6">
        <!-- Spinner -->
        <div class="relative flex h-16 w-16 items-center justify-center">
          <!-- Static Background Ring -->
          <div
            class="absolute inset-0 rounded-full border-[3px] border-slate-200/50 dark:border-white/5"
          />

          <!-- Animated Gradient Ring -->
          <div
            class="absolute inset-0 rounded-full border-[3px] border-transparent border-r-sky-500 border-t-indigo-500 animate-[spin_1.5s_linear_infinite]"
          />

          <!-- Inner Glow Ring -->
          <div
            class="absolute inset-2 rounded-full border-2 border-transparent border-l-fuchsia-500 border-b-sky-400 opacity-50 animate-[spin_2s_linear_infinite_reverse]"
          />

          <!-- Center Icon -->
          <span class="text-xl drop-shadow-md animate-pulse">🐻</span>
        </div>

        <!-- Terminal Text -->
        <div class="flex items-center gap-2 font-mono text-sm tracking-wider">
          <span class="text-indigo-500 dark:text-indigo-400">➜</span>
          <span class="text-sky-500 dark:text-sky-400">~</span>
          <span class="text-slate-600 dark:text-slate-400">
            {{ text }}
          </span>
          <span class="text-sky-500 animate-pulse">_</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: "Booting matrix system...",
  },
});
</script>

<style scoped>
/* 优雅的淡入淡出过渡 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    backdrop-filter 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  backdrop-filter: blur(12px); /* 退出时带有微微的毛玻璃消散感 */
}

/* 噪点背景 */
.noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
