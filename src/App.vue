<script setup lang="ts">
import { onMounted } from 'vue'
import { useRepoStore } from '@/stores/useRepoStore'

const repoStore = useRepoStore()

onMounted(() => {
  repoStore.loadRepos('JacAndre')
})
</script>

<template>
  <div>
    <h2>Username: {{ repoStore.currentUsername }}</h2>
    <pre>{{ repoStore.repoJson }}</pre>
    <div>{{ repoStore.readme }}</div>
  </div>
</template>

<style scoped></style>
