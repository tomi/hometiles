<template>
  <div v-if="!feedUrl">
    <p class="mb-4">Set up an RSS feed</p>

    <div class="flex flex-row space-x-4">
      <input class="flex-grow p-1" type="text" placeholder="RSS URL" v-model="rssFeedUrlInput" />
      <button @click="addRssFeed">Add</button>
    </div>
  </div>
  <RssReaderTileContent
    v-else
    :title="title ?? feed?.title"
    :items="feed?.items"
  ></RssReaderTileContent>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useQuery } from "vue-query";

import { fetchAndParseRss, Iso8601Timestamp } from "./RssFeedReader";
import { loadState, persistState } from "./RssReaderTileState";
import { formatDateTime } from "../../lib/dateTimeFormatter";
import RssReaderTileContent from "./RssReaderTileContent.vue";

export default defineComponent({
  props: {
    tileId: {
      type: String,
      required: true,
    },
  },

  components: {
    RssReaderTileContent,
  },

  data() {
    return {
      rssFeedUrlInput: "",
    };
  },

  methods: {
    async addRssFeed() {
      this.feedUrl = this.rssFeedUrlInput;
    },

    formatDateTime(datetime?: Date | Iso8601Timestamp) {
      return formatDateTime(datetime);
    },
  },

  setup(props) {
    const state = loadState(props.tileId);
    const feedUrl = ref(state.feedUrl);
    const title = ref(state.title);

    const {
      isLoading,
      isError,
      isFetching,
      data: feed,
      error,
    } = useQuery(["rssFeed", feedUrl], () => fetchAndParseRss(feedUrl.value!), {
      enabled: computed(() => !!feedUrl.value),
      staleTime: 5 * 60 * 1000,
      placeholderData: state.feed,
    });

    watch(feed, (newFeed) => {
      persistState(props.tileId, {
        v: 3,
        feed: newFeed,
        feedUrl: feedUrl.value,
        title: title.value,
      });
    });

    return { feedUrl, title, isLoading, isError, isFetching, feed, error };
  },
});
</script>
