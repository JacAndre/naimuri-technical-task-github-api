<template>
  <v-app>
    <v-snackbar v-model="repoStore.snackbar" color="error" timeout="4000">
      {{ repoStore.snackbarMessage }}
    </v-snackbar>
    <v-toolbar title="Naimuri Technical Challenge: GitHub UI" color="indigo-darken-3"></v-toolbar>
    <v-container>
      <UserSearchBar />
    </v-container>
    <v-container v-if="repoStore.user">
      <div class="position-relative d-inline-block">
        <div class="mb-0" @mouseenter="showOverlay = true" @mouseleave="showOverlay = false">
          <a :href="repoStore.user?.html_url" target="_blank" class="text-decoration-none">
            <div class="d-flex align-center">
              <v-avatar class="me-3">
                <v-img alt="Avatar" :src="repoStore.user?.avatar_url" />
              </v-avatar>
              <span class="text-h5">{{ repoStore.username }}</span>
            </div>
          </a>

          <UserProfileOverlay v-if="showOverlay" :user="repoStore.user" />
        </div>
      </div>
      <AppTable></AppTable>
    </v-container>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRepoStore } from '@/stores/useRepoStore'
import AppTable from './components/AppTable.vue'
import UserProfileOverlay from './components/UserProfileOverlay.vue'
import AppFooter from './components/AppFooter.vue'
import UserSearchBar from './components/UserSearchBar.vue'

defineOptions({
  name: 'App',
})

const repoStore = useRepoStore()
const showOverlay = ref(false)
</script>

<style>
a:visited {
  color: blue;
}
</style>
