<template>
  <button aria-label="label" :class="`flex ${className}`">
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
    className: {
      type: String,
    },
  },
};
</script>

<style></style>
