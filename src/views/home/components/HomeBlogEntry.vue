<template>
  <li class="min-w-0 border-b border-slate-200 dark:border-slate-700">
    <a
      :href="blog.link"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-full min-h-28 items-center gap-3.5 py-5 sm:min-h-32 sm:gap-5 sm:py-6 md:gap-3.5 lg:gap-5"
    >
      <img
        v-if="blog.cover && !coverBroken"
        :src="blog.cover"
        alt="blog cover"
        width="120"
        height="80"
        decoding="async"
        class="h-[60px] w-[90px] shrink-0 rounded-lg bg-blue-50 dark:bg-slate-800 object-cover sm:h-20 sm:w-[120px] md:h-16 md:w-24 lg:h-20 lg:w-[120px]"
        @error="coverBroken = true"
      />
      <span
        v-else
        class="flex h-[60px] w-[90px] shrink-0 items-center justify-center rounded-lg bg-slate-100 text-2xl text-slate-400 sm:h-20 sm:w-[120px] md:h-16 md:w-24 lg:h-20 lg:w-[120px] dark:bg-slate-800"
        aria-hidden="true"
      >
        <i :class="routeIcon.blog"></i>
      </span>
      <div class="flex min-w-0 flex-1 flex-col">
        <h3
          class="line-clamp-2 text-base font-medium leading-relaxed [overflow-wrap:anywhere] transition-colors group-hover:text-blue-600 motion-reduce:transition-none dark:group-hover:text-blue-300"
        >
          {{ blog.title }}
        </h3>
        <span class="mt-2.5 flex flex-wrap gap-3.5 text-xs home-muted"
          >{{ displayDate(blog.postTime)
          }}<span
            >CSDN
            <i class="fa-solid fa-arrow-up-right-from-square ml-1" aria-hidden="true"></i></span
        ></span>
      </div>
    </a>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { routeIcon } from "@/config.js";
import { formatWithoutSeconds } from "@/utils/date.js";

defineProps({ blog: { type: Object, required: true } });

const coverBroken = ref(false);
const displayDate = (value) => formatWithoutSeconds(value);
</script>
