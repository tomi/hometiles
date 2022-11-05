<template>
  <button aria-label="label">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
