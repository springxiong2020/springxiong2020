<template>
  <resource-list-page
    title-id="sentence-title"
    title="三五七言"
    description="长相思兮长相忆，短相思兮无穷极"
    label="诗文"
    unit="篇"
    empty-text="暂无诗文数据"
    empty-class="rounded-2xl border border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
    :fetch-page="getMineSentencesList"
  >
    <template #notice>
      <dictionary-error-notice :dictionaries="['sentenceCategory']" />
    </template>
    <template #loading>
      <div class="grid gap-6 lg:grid-cols-2">
        <sentence-skeleton v-for="n in 8" :key="n" />
      </div>
    </template>
    <template #default="{ items: sentences }">
      <div class="grid gap-6 lg:grid-cols-2">
        <sentence-entry
          v-for="sentence in sentences"
          :key="sentence.id"
          :sentence="sentence"
          @read="openDetail"
        />
      </div>
    </template>
  </resource-list-page>

  <sentence-detail-modal
    :visible="modalVisible"
    :sentence="selectedSentence"
    @close="modalVisible = false"
  />
</template>

<script setup>
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { getMineSentencesList } from "@/api/mine.js";
import ResourceListPage from "@/components/ResourceListPage.vue";
import SentenceSkeleton from "./SentenceSkeleton.vue";
import SentenceEntry from "./SentenceEntry.vue";
import DictionaryErrorNotice from "@/components/notice/DictionaryErrorNotice.vue";
import SentenceDetailModal from "@/components/modal/SentenceDetailModal.vue";

defineOptions({ name: "SentencePage" });

const modalVisible = ref(false);
const selectedSentence = ref({});

function openDetail(sentence, event) {
  event.currentTarget.focus({ preventScroll: true });
  selectedSentence.value = sentence;
  modalVisible.value = true;
}

onBeforeRouteLeave(() => {
  modalVisible.value = false;
});
</script>
