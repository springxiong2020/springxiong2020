<template>
  <div>
    <InfiniteSection
      title="三五七言"
      subtitle="长相思兮长相忆，短相思兮无穷极"
      :api-fn="getMineSentencesList"
      :page-size="pageSize"
      grid-class="grid grid-cols-1 gap-6 md:grid-cols-2"
      empty-icon="fa-solid fa-feather"
    >
      <template #skeleton>
        <SentenceSkeleton v-for="n in pageSize" :key="n" />
      </template>

      <template #content="{ list }">
        <SentenceCard
          v-for="item in list"
          :key="item.id"
          :sentence="item"
          @click="openDetail(item)"
        />
      </template>
    </InfiniteSection>

    <SentenceDetailModal
      :visible="modalVisible"
      :sentence="selectedSentence"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getMineSentencesList } from "@/api/mine.js";
import InfiniteSection from "@/components/InfiniteSection.vue";
import SentenceCard from "@/components/card/SentenceCard.vue";
import SentenceDetailModal from "@/components/modal/SentenceDetailModal.vue";
import SentenceSkeleton from "@/components/skeleton/SentenceSkeleton.vue";

const pageSize = 4 * 2;

const modalVisible = ref(false);
const selectedSentence = ref({});

const openDetail = (sentence) => {
  selectedSentence.value = sentence;
  modalVisible.value = true;
};
</script>
