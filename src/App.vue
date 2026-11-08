<template>
  <GlobalLoading :is-loading="isLoading" text="Initializing universe..." />
  <div class="min-h-screen">
    <PageHeader />
    <PageBody />
    <PageFooter />
    <DarkModeFloat />
    <GlobalSearchModal />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/components/layout/PageHeader.vue";
import PageFooter from "@/components/layout/PageFooter.vue";
import PageBody from "@/components/layout/PageBody.vue";
import DarkModeFloat from "@/components/DarkModeFloat.vue";
import GlobalSearchModal from "@/components/search/GlobalSearchModal.vue";
import GlobalLoading from "@/components/GlobalLoading.vue";
import { useDictStore } from "@/stores/dictStore.js";

const dictStore = useDictStore();
onMounted(dictStore.initDict);

const router = useRouter();
const isLoading = ref(false);
let loadingTimer = null;
const LOADING_DELAY = 300;

const startLoading = () => {
  if (loadingTimer) clearTimeout(loadingTimer);

  loadingTimer = setTimeout(() => {
    isLoading.value = true;
  }, LOADING_DELAY);
};

const endLoading = () => {
  if (loadingTimer) clearTimeout(loadingTimer);
  isLoading.value = false;
};

onMounted(() => {
  router.beforeEach(startLoading);
  router.afterEach(endLoading);
});

onUnmounted(endLoading);
</script>

<style>
/* 页面间切换的微小浮动渐变效果 */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
