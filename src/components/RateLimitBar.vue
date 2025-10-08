<template>
  <v-card class="py-4" elevation="0">
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <span class="text-caption grey--text">
          {{ rateLimitStore.remaining }} / {{ rateLimitStore.limit }} remaining
        </span>
      </v-col>
    </v-row>

    <v-progress-linear :model-value="usedPercent" :color="barColor" height="8" rounded striped />

    <v-row class="mt-2 px-4">
      <v-spacer />
      <span class="text-caption grey--text"> Resets at {{ resetTime }}</span>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRateLimitStore } from '@/stores/useRateLimitStore'

const rateLimitStore = useRateLimitStore()

onMounted(() => {
  rateLimitStore.checkRateLimit()
})

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
