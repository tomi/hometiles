<template>
  <Tile>
    <div v-if="!feed">
      <p class="mb-4">Set up an RSS feed</p>

      <div class="flex flex-row space-x-4">
        <input class="flex-grow p-1" type="text" placeholder="RSS URL" v-model="feedUrlToAdd" />
        <button @click="loadRss">Add</button>
      </div>
    </div>
    <div v-else>
      <h2>{{ feed.title }}</h2>
      <div class="border-t border-t-gray-700 w-full my-1" />
      <div class="space-y-2">
        <div class="text-sm" v-for="item in itemsToDisplay">
          <a class="text-white font-medium" v-bind:href="item.link" target="_blank">{{
            item.title
          }}</a>
          <div class="text-xs">
            {{
              item.pubDate
                ? new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                    hour12: false,
                  }).format(new Date(item.pubDate))
                : ""
            }}
          </div>
        </div>
      </div>
    </div>
  </Tile>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type * as htmlparser2 from "htmlparser2";

import Tile from "../Tile/Tile.vue";
import { Feed, FeedItem, fetchAndParseRss } from "./RssFeedReader";
import { from } from "fromfrom";
import { loadTileState, persistTileState } from "../../lib/localStorage";

type RssReaderTileState = Feed;

export default defineComponent({
  props: {
    tileId: {
      type: String,
      required: true,
    },
  },

  components: {
    Tile,
  },

  data() {
    return {
      feedUrlToAdd: "",
      feed: null as Feed | null,
    };
  },

  computed: {
    itemsToDisplay(): FeedItem[] {
      return from(this.feed?.items ?? [])
        .take(5)
        .sortByDescending((x) => x.pubDate)
        .toArray();
    },
  },

  methods: {
    async loadRss() {
      const url = this.feedUrlToAdd;
      const feed = await fetchAndParseRss(url);
      if (feed) {
        this.feed = feed;
        persistTileState(this.tileId, feed);
      }
    },
  },

  mounted() {
    const loadedState = loadTileState<RssReaderTileState>(this.tileId);
    if (loadedState) {
      this.feed = loadedState;
    }
  },
});
</script>
