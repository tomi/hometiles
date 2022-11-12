<template>
  <div
    class="p-8 pb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-8 grid-flow-row-dense"
  >
    <template v-for="tile in store.tiles" :key="tile.id">
      <Tile :tile="tile" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Tile from "../Tile/Tile.vue";
import { loadState, store } from "../../state";
import { onMounted } from "vue";

onMounted(() => {
  loadState();
});
</script>

<style scoped></style>
