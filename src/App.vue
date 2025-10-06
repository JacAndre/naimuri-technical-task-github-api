<template>
  <div>
    <h2>
      <a :href="repoStore.user?.html_url" target="_blank">{{ repoStore.username }}</a>
      <img :src="repoStore.user?.avatar_url" alt="user_avatar" />
    </h2>
    <AppTable></AppTable>
    <pre>{{ repoStore.repoJson }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRepoStore } from '@/stores/useRepoStore'
import AppTable from './components/AppTable.vue'

defineOptions({
  name: 'App',
})

const repoStore = useRepoStore()

onMounted(() => {
  repoStore.loadRepos('JacAndre')
  repoStore.loadUserInfo('JacAndre')
})
</script>

<style scoped></style>
