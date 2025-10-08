<template>
  <v-footer class="justify-end pa-2" role="contentinfo" aria-label="Footer with GitHub API stats">
    <v-menu
      v-model="showStats"
      location="top"
      offset="8"
      transition="scale-transition"
      role="dialog"
      aria-label="GitHub API statistics popup"
    >
      <template #activator="{ props }">
        <v-btn icon v-bind="props" aria-label="Open GitHub API statistics">
          <v-icon aria-hidden="true">mdi-chart-bar</v-icon>
        </v-btn>
      </template>

      <v-card width="300" role="region" aria-label="GitHub API statistics panel">
        <v-card-title>
          <v-icon class="mr-2" aria-hidden="true">mdi-github</v-icon>
          <span class="font-weight-medium">GitHub API Stats</span>
        </v-card-title>
        <v-card-text>
          <RateLimitBar />
        </v-card-text>
      </v-card>
    </v-menu>
  </v-footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import RateLimitBar from '@/components/RateLimitBar.vue'
import { useRateLimitStore } from '@/stores/useRateLimitStore'

const { checkRateLimit } = useRateLimitStore()
const showStats = ref(false)

watch(showStats, (open) => {
  if (open) {
    checkRateLimit()
  }
})
</script>
