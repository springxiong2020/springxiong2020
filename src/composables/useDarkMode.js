import { ref } from "vue";

const modes = ["system", "light", "dark"];
const theme = ref("system");
const isDark = ref(false);
let mediaQuery;
let initialized = false;

const normalizeTheme = (value) => (modes.includes(value) ? value : "system");

const applyTheme = () => {
  isDark.value = theme.value === "dark" || (theme.value === "system" && mediaQuery.matches);
  document.documentElement.classList.toggle("dark", isDark.value);
  document.documentElement.style.colorScheme = isDark.value ? "dark" : "light";
};

// 应用级单例：在挂载前初始化，多个组件共享状态及系统监听。
export const initTheme = () => {
  if (initialized) return;
  initialized = true;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    theme.value = normalizeTheme(localStorage.getItem("theme"));
  } catch {
    theme.value = "system";
  }
  applyTheme();
  mediaQuery.addEventListener("change", () => {
    if (theme.value === "system") applyTheme();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== "theme" && event.key !== null) return;
    theme.value = normalizeTheme(event.newValue);
    applyTheme();
  });
};

const setTheme = (value) => {
  initTheme();
  theme.value = normalizeTheme(value);
  applyTheme();
  try {
    localStorage.setItem("theme", theme.value);
  } catch {
    // 存储不可用时仍允许在当前页面切换主题。
  }
};

export const useDarkMode = () => {
  initTheme();
  const toggleTheme = () => {
    setTheme(modes[(modes.indexOf(theme.value) + 1) % modes.length]);
  };
  return { theme, isDark, setTheme, toggleTheme };
};
