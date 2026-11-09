<template>
  <a href="#main-content" class="skip-link" @click.prevent="focusMain"> 跳到主要内容 </a>

  <global-loading :is-loading="isLoading" text="Initializing universe…" />
  <global-search-modal />

  <div class="flex min-h-screen flex-col">
    <page-header />

    <navigation-error-notice
      v-if="navigationError"
      :retrying="isRetrying"
      @retry="retryNavigation"
      @reload="reloadPage"
    />

    <page-body />
    <page-footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/components/layout/PageHeader.vue";
import PageBody from "@/components/layout/PageBody.vue";
import PageFooter from "@/components/layout/PageFooter.vue";
import GlobalSearchModal from "@/components/modal/GlobalSearchModal.vue";
import GlobalLoading from "@/components/GlobalLoading.vue";
import NavigationErrorNotice from "@/components/notice/NavigationErrorNotice.vue";
import { useDictStore } from "@/stores/dictStore.js";

const dictStore = useDictStore();
onMounted(dictStore.initDict);

// 无障碍模式时聚焦主内容区
const focusMain = () => {
  const main = document.getElementById("main-content");
  main?.focus({ preventScroll: true });
  main?.scrollIntoView({ behavior: "instant", block: "start" });
};

const router = useRouter();
const isLoading = ref(false);
const navigationError = ref(null);
const isRetrying = ref(false);
let loadingTimer = null;
let pendingNavigation = null;
const LOADING_DELAY = 300;

const endLoading = () => {
  if (loadingTimer !== null) clearTimeout(loadingTimer);
  loadingTimer = null;
  isLoading.value = false;
};

// 在 setup 中注册，也覆盖应用首次进入异步路由时的失败。
const removeBeforeEach = router.beforeEach((to) => {
  endLoading();
  pendingNavigation = to;
  if (isRetrying.value) return;
  navigationError.value = null;
  loadingTimer = setTimeout(() => {
    isLoading.value = true;
  }, LOADING_DELAY);
});
const removeAfterEach = router.afterEach((to) => {
  if (to !== pendingNavigation) return;
  pendingNavigation = null;
  navigationError.value = null;
  endLoading();
});
const removeOnError = router.onError((_error, to) => {
  // 旧导航晚失败时，不打断已经开始的新导航。
  if (to !== pendingNavigation) return;
  pendingNavigation = null;
  endLoading();
  navigationError.value = { path: to.fullPath };
});

const retryNavigation = async () => {
  if (!navigationError.value || isRetrying.value) return;
  const path = navigationError.value.path;
  isRetrying.value = true;
  try {
    await router.push(path);
  } catch {
    // onError 负责恢复错误提示，避免事件处理器产生未处理的拒绝。
  } finally {
    isRetrying.value = false;
  }
};
const reloadPage = () => window.location.reload();

onUnmounted(() => {
  removeBeforeEach();
  removeAfterEach();
  removeOnError();
  endLoading();
});
</script>
