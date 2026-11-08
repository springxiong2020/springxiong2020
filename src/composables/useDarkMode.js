import { ref, onMounted } from "vue";

export const useDarkMode = () => {
  const isDark = ref(false);

  const applyTheme = (dark) => {
    isDark.value = dark;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = () => {
    applyTheme(!isDark.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme === "dark");
    } else {
      // 跟随系统深色模式偏好
      applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  });

  return {
    isDark,
    toggleTheme,
  };
};
