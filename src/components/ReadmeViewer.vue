<template>
  <div class="readme-container">
    <v-progress-linear v-if="loading" indeterminate color="primary" height="4" />
    <pre v-else>{{ content }}</pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  loading?: boolean
}>()
</script>

<style scoped>
.readme-container {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre;
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
