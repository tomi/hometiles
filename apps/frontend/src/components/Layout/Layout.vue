<template>
  <div class="h-screen">
    <div class="fixed right-8 bottom-8" :class="{ hidden: isMenuOpen }">
      <IconButton label="Settings" @click="toggleMenu">
        <IconCog width="32" height="32" />
      </IconButton>
    </div>

    <div class="flex flex-row h-full">
      <div class="grow">
        <slot></slot>
      </div>

      <div
        class="h-full w-0 overflow-hidden bg-[#444444] transition-all"
        :class="{
          'min-w-[300px]': isMenuOpen,
          'min-w-0': !isMenuOpen,
        }"
      >
        <Menu @close="toggleMenu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconCog from "~icons/mdi/cog";
import IconButton from "../IconButton/IconButton.vue";
import Menu from "../Menu/Menu.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped></style>
