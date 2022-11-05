<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import RssReaderTile from "./components/RssReaderTile/RssReaderTile.vue";
import StockQuote from "./components/StockQuotesTile/StockQuotesTile.vue";
</script>

<template>
  <div
    class="m-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-8 grid-flow-row-dense"
  >
    <StockQuote />
    <RssReaderTile tile-id="rss-reader-1" />
    <RssReaderTile tile-id="rss-reader-2" />
    <RssReaderTile tile-id="rss-reader-3" />
  </div>
</template>

<style scoped></style>
