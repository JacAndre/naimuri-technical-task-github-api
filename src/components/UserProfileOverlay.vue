<template>
  <v-card v-if="user" elevation="10" class="pa-4 profile-overlay" variant="flat">
    <div class="text-h6 mb-2">
      {{ user.name }}
    </div>
    <div v-if="user.bio" class="mb-2">
      {{ user.bio }}
    </div>
    <v-divider class="mb-2"></v-divider>
    <div v-if="user.location" class="mb-2">
      <v-icon class="mr-2">mdi-map-marker</v-icon>
      {{ user.location }}
    </div>
    <div v-if="user.followers !== undefined">
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ user.followers }} followers · {{ user.following }} following
    </div>
    <v-btn variant="text" :href="user.html_url" target="_blank" size="small" class="mt-2">
      View GitHub
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  user: {
    name: string
    html_url: string
    bio?: string
    location?: string
    followers?: number
    following?: number
  } | null
}>()
</script>

<style scoped>
.profile-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 300px;
}
</style>
