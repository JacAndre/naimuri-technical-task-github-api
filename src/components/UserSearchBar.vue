<template>
  <div ref="activatorRef">
    <v-text-field
      v-model="repoStore.searchQuery"
      :loading="repoStore.loadingSuggestions"
      label="Search GitHub Users"
      @input="onInput"
      clearable
      single-line
      variant="solo"
      append-inner-icon="mdi-magnify"
      hide-details
      aria-label="GitHub user search input"
      role="searchbox"
    />
  </div>

  <v-menu
    v-if="repoStore.suggestions.length > 0"
    v-model="menuOpen"
    :activator="activatorRef"
    :close-on-content-click="false"
    transition="slide-y-transition"
    max-height="300"
    aria-label="GitHub user suggestions menu"
    role="listbox"
    flat
  >
    <v-list>
      <v-list-item
        v-for="user in repoStore.suggestions"
        :key="user.login"
        @click="selectUser(user)"
        role="option"
        :aria-label="`Select GitHub user ${user.login}`"
      >
        <div class="d-flex align-center">
          <v-avatar size="24" class="me-2" aria-hidden="true">
            <v-img :src="user.avatar_url" />
          </v-avatar>
          <span class="font-weight-medium">{{ user.login }}</span>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRepoStore } from '@/stores/useRepoStore'
import type { SuggestedUser } from '@/types/suggestedUser'

const repoStore = useRepoStore()

const menuOpen = ref(false)
const activatorRef = ref()

// Watch for new suggestions and open the dropdown
watch(
  () => repoStore.suggestions,
  (newVal) => {
    if (newVal.length > 0) {
      menuOpen.value = true
    }
  },
)

// Trigger search via store
function onInput() {
  if (repoStore.searchQuery.length >= 2) {
    repoStore.fetchUserAutofill(repoStore.searchQuery)
  } else {
    menuOpen.value = false
  }
}

// Handle selection
function selectUser(user: SuggestedUser) {
  repoStore.searchQuery = user.login
  menuOpen.value = false
  repoStore.loadUserInfo(user.login)
  repoStore.loadRepos(user.login)
}
</script>
