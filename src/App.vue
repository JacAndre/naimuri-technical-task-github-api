<template>
  <v-app>
    <!-- Snackbar for error messages -->
    <v-snackbar
      v-model="repoStore.snackbar"
      color="error"
      timeout="4000"
      role="alert"
      aria-live="assertive"
      aria-label="Error notification"
    >
      {{ repoStore.snackbarMessage }}
    </v-snackbar>

    <!-- Toolbar -->
    <v-toolbar
      title="Naimuri Technical Challenge: GitHub UI"
      color="indigo-darken-3"
      role="banner"
      aria-label="Application header"
    />

    <!-- Search bar container -->
    <v-container
      :class="
        repoStore.user
          ? 'pt-4 d-flex justify-center'
          : 'fill-height d-flex align-center justify-center'
      "
      role="search"
      aria-label="GitHub user search"
    >
      <div class="w-100" style="max-width: 600px">
        <UserSearchBar />
      </div>
    </v-container>

    <!-- User profile and repo table -->
    <v-container
      v-if="repoStore.user"
      role="region"
      aria-label="GitHub user profile and repositories"
    >
      <div class="position-relative d-inline-block">
        <div class="mb-0" @mouseenter="showOverlay = true" @mouseleave="showOverlay = false">
          <a
            :href="repoStore.user?.html_url"
            target="_blank"
            class="text-decoration-none"
            :aria-label="`Open GitHub profile for ${repoStore.username}`"
          >
            <div class="d-flex align-center">
              <v-avatar class="me-3">
                <v-img :src="repoStore.user?.avatar_url" alt="GitHub user avatar" />
              </v-avatar>
              <span class="text-h5" role="heading" aria-level="2">
                {{ repoStore.username }}
              </span>
            </div>
          </a>

          <UserProfileOverlay
            v-if="showOverlay"
            :user="repoStore.user"
            aria-label="GitHub user profile overlay"
          />
        </div>
      </div>

      <AppTable />
    </v-container>

    <!-- Footer -->
    <AppFooter />
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
