<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="border-t border-t-gray-700 w-full my-1" />
    <div class="space-y-2">
      <div class="text-sm" v-for="item in itemsToDisplay">
        <a class="text-white font-medium" v-bind:href="item.link" target="_blank">{{
          item.title
        }}</a>
        <div class="text-xs">
          {{ formatDateTime(item.pubDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { from } from "fromfrom";
import { defineComponent, PropType } from "vue";
import { formatDateTime } from "../../lib/dateTimeFormatter";
import { FeedItem, Iso8601Timestamp } from "./RssFeedReader";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    items: {
      type: Array as PropType<FeedItem[]>,
    },
  },

  computed: {
    itemsToDisplay(): FeedItem[] {
      return from(this.items ?? [])
        .take(5)
        .sortByDescending((x) => x.pubDate)
        .toArray();
    },
  },

  methods: {
    formatDateTime(datetime?: Date | Iso8601Timestamp) {
      return formatDateTime(datetime);
    },
  },
});
</script>

<style scoped></style>
