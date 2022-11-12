<template>
  <div class="h-full flex flex-col text-lg">
    <div class="flex justify-center items-center py-2 relative">
      Settings
      <div class="absolute right-2">
        <IconButton label="Close settings" @click="$emit('close')">
          <IconWindowClose />
        </IconButton>
      </div>
    </div>

    <div class="border-t border-t-slate-400" />

    <div class="flex flex-col p-4">
      <p class="mb-2">Add tile</p>

      <ul class="space-y-2 flex flex-col">
        <template v-for="tileType in tileTypes">
          <li
            @click="addTile({ type: tileType.type })"
            class="text-sm hover:bg-slate-600 cursor-pointer flex flex-row items-center py-2"
          >
            <div class="mr-2">
              <IconRss v-if="tileType.type === 'rss'" class="text-xl" />
              <IconEur v-if="tileType.type === 'stock'" class="text-xl" />
            </div>
            {{ tileType.name }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconWindowClose from "~icons/mdi/window-close";
import IconRss from "~icons/mdi/rss";
import IconEur from "~icons/mdi/currency-eur";
import IconButton from "../IconButton/IconButton.vue";
import { tileTypes, addTile } from "../../state";
</script>

<style scoped></style>
