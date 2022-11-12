<template>
  <div class="rounded-md bg-gray-900 p-4 relative" @mouseover="onMouseOver" @mouseout="onMouseOut">
    <slot></slot>
    <RssReaderTile v-if="tile.type === 'rss'" :tile-id="tile.id" />
    <StockQuotesTile v-if="tile.type === 'stock'" :tile-id="tile.id" />

    <IconButton
      slot="reference"
      label="menu"
      className="absolute right-0 top-0 bg-black p-1 hover:bg-slate-800 rounded-tr-md"
      :class="{
        hidden: !showMenuBtn,
        block: showMenuBtn,
      }"
      @click="toggleMenu"
    >
      <IconDots />
    </IconButton>

    <ul v-if="showMenu" class="absolute top-7 right-0 bg-black">
      <li
        class="flex flex-row items-center cursor-pointer hover:bg-slate-800 p-2"
        @click="onRemove"
      >
        <div class="mr-2">
          <IconDelete />
        </div>
        <p class="text-sm">Remove</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { removeTile, Tile } from "../../state";
import RssReaderTile from "../RssReaderTile/RssReaderTile.vue";
import StockQuotesTile from "../StockQuotesTile/StockQuotesTile.vue";
import IconDots from "~icons/mdi/dots-horizontal";
import IconDelete from "~icons/mdi/delete";
import IconButton from "../IconButton/IconButton.vue";
import { ref } from "vue";

const props = defineProps<{
  tile: Tile;
}>();

const showMenuBtn = ref(false);
const showMenu = ref(false);

const onMouseOver = () => {
  showMenuBtn.value = true;
};
const onMouseOut = () => {
  if (!showMenu.value) {
    showMenuBtn.value = false;
  }
};
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const onRemove = () => {
  removeTile(props.tile.id);
};
</script>

<style scoped></style>
