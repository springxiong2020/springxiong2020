<template>
  <div
    ref="floatRef"
    class="fixed z-[9999] touch-none select-none"
    :style="wrapperStyle"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
  >
    <button
      class="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/80 text-slate-700 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100"
      @click="handleClick"
    >
      <!-- Glow -->
      <div
        class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :class="isDark ? 'bg-amber-400/10' : 'bg-sky-400/10'"
      />

      <!-- Icon -->
      <i
        class="relative z-10 text-lg transition-all duration-500"
        :class="
          isDark
            ? 'fa-solid fa-sun rotate-180 text-amber-400'
            : 'fa-solid fa-moon text-slate-700'
        "
      ></i>

      <!-- Ring -->
      <div
        class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";

const STORAGE_KEY = "dark-mode-float-position";
const { isDark, toggleTheme } = useDarkMode();

const floatRef = ref();

const position = ref({
  x: window.innerWidth - 80,
  y: window.innerHeight - 100,
});

const dragging = ref(false);
const moved = ref(false);

let startX = 0;
let startY = 0;

let initialX = 0;
let initialY = 0;

const wrapperStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
  transition: dragging.value ? "none" : "all 0.25s cubic-bezier(0.4,0,0.2,1)",
}));

const clampPosition = (x, y) => {
  const width = 56;
  const height = 56;

  const safeBottom = 16;
  const safeTop = 16;

  const maxX = window.innerWidth - width - 8;
  const maxY = window.innerHeight - height - safeBottom;

  return {
    x: Math.min(Math.max(8, x), maxX),
    y: Math.min(Math.max(safeTop, y), maxY),
  };
};

const savePosition = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(position.value));
};

const loadPosition = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    position.value = clampPosition(parsed.x, parsed.y);
  } catch (e) {
    console.error(e);
  }
};

const startDrag = (e) => {
  dragging.value = true;
  moved.value = false;

  const point = e.touches?.[0] || e;

  startX = point.clientX;
  startY = point.clientY;

  initialX = position.value.x;
  initialY = position.value.y;

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("touchmove", onDrag, {
    passive: false,
  });

  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchend", stopDrag);
};

const onDrag = (e) => {
  if (!dragging.value) return;

  e.preventDefault();

  const point = e.touches?.[0] || e;

  const deltaX = point.clientX - startX;
  const deltaY = point.clientY - startY;

  if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
    moved.value = true;
  }

  position.value = clampPosition(initialX + deltaX, initialY + deltaY);
};

const stopDrag = () => {
  if (!dragging.value) return;

  dragging.value = false;

  const width = 56;

  // 自动吸边
  const middle = window.innerWidth / 2;

  position.value.x =
    position.value.x + width / 2 < middle ? 8 : window.innerWidth - width - 8;

  savePosition();

  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchend", stopDrag);
};

const handleClick = () => {
  // 防止拖动后触发点击
  if (moved.value) return;

  toggleTheme();
};

const handleResize = () => {
  position.value = clampPosition(position.value.x, position.value.y);
};

onMounted(() => {
  loadPosition();

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
