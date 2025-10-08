<template>
  <v-card
    v-if="user"
    elevation="10"
    class="pa-4 profile-overlay"
    variant="flat"
    role="region"
    :aria-label="`GitHub profile card for ${user.name}`"
  >
    <div class="text-h6 mb-2" role="heading" aria-level="2">
      {{ user.name }}
    </div>

    <div v-if="user.bio" class="mb-2" :aria-label="`Bio: ${user.bio}`">
      {{ user.bio }}
    </div>

    <v-divider class="mb-2" aria-hidden="true"></v-divider>

    <div
      v-if="user.location"
      class="mb-2"
      role="contentinfo"
      :aria-label="`Location: ${user.location}`"
    >
      <v-icon class="mr-2" aria-hidden="true">mdi-map-marker</v-icon>
      {{ user.location }}
    </div>

    <div
      v-if="user.followers !== undefined"
      role="contentinfo"
      :aria-label="`${user.followers} followers and ${user.following} following`"
    >
      <v-icon class="mr-2" aria-hidden="true">mdi-account-group</v-icon>
      {{ user.followers }} followers · {{ user.following }} following
    </div>

    <v-btn
      variant="text"
      :href="user.html_url"
      target="_blank"
      size="small"
      class="mt-2"
      aria-label="View GitHub profile in a new tab"
    >
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
