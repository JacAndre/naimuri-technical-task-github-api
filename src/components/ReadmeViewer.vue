<template>
  <v-sheet elevation="1" class="pa-4" style="max-height: 60vh; overflow-y: auto; overflow-x: auto">
    <v-progress-linear v-if="loading" indeterminate color="primary" height="4" />
    <pre v-else>{{ content }}</pre>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  loading?: boolean
}>()
</script>

<style scoped></style>
