<template>
  <v-card class="py-4" elevation="0" role="region" aria-label="GitHub API usage bar">
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <span
          class="text-caption grey--text"
          :aria-label="`${rateLimitStore.remaining} of ${rateLimitStore.limit} requests remaining`"
        >
          {{ rateLimitStore.remaining }} / {{ rateLimitStore.limit }} remaining
        </span>
      </v-col>
    </v-row>

    <v-progress-linear
      :model-value="usedPercent"
      :color="barColor"
      height="8"
      rounded
      striped
      aria-label="GitHub API usage progress bar"
    />

    <v-row class="mt-2 px-4">
      <v-spacer />
      <span class="text-caption grey--text" :aria-label="`Rate limit resets at ${resetTime}`">
        Resets at {{ resetTime }}
      </span>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRateLimitStore } from '@/stores/useRateLimitStore'

const rateLimitStore = useRateLimitStore()

const usedPercent = computed(() => {
  return rateLimitStore.limit.valueOf() > 0
    ? ((rateLimitStore.limit.valueOf() - rateLimitStore.remaining.valueOf()) /
        rateLimitStore.limit.valueOf()) *
        100
    : 0
})

const barColor = computed(() => {
  if (usedPercent.value >= 90) return 'red'
  if (usedPercent.value >= 75) return 'orange'
  return 'green'
})

const resetTime = computed(() =>
  new Date(rateLimitStore.reset.valueOf() * 1000).toLocaleTimeString(),
)
</script>

<style scoped>
.v-progress-linear {
  transition: width 0.3s ease;
}
</style>
