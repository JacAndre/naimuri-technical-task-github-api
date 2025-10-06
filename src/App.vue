<template>
  <v-toolbar title="Naimuri Technical Challenge: GitHub UI" color="pink-darken-1"></v-toolbar>

  <v-container>
    <div class="position-relative d-inline-block">
      <div
        class="d-flex align-center mb-0"
        @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = false"
      >
        <a :href="repoStore.user?.html_url" target="_blank" class="text-decoration-none">
          <v-avatar class="me-3">
            <v-img alt="Avatar" :src="repoStore.user?.avatar_url" />
          </v-avatar>
          <span class="text-h5">{{ repoStore.username }}</span>
        </a>

        <UserProfileOverlay v-if="showOverlay" :user="repoStore.user" />
      </div>
    </div>

    <AppTable></AppTable>
    <pre>{{ repoStore.repos }}</pre>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRepoStore } from '@/stores/useRepoStore'
import AppTable from './components/AppTable.vue'
import UserProfileOverlay from './components/UserProfileOverlay.vue'

defineOptions({
  name: 'App',
})

const repoStore = useRepoStore()
const showOverlay = ref(false)

onMounted(() => {
  repoStore.loadRepos('JacAndre')
  repoStore.loadUserInfo('JacAndre')
})
</script>

<style scoped></style>
