<template>
  <v-footer class="justify-end pa-2">
    <v-menu v-model="showStats" location="top" offset="8" transition="scale-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-chart-bar</v-icon>
        </v-btn>
      </template>

      <v-card width="300">
        <v-card-title>
          <v-icon class="mr-2">mdi-github</v-icon>
          GitHub API Stats
        </v-card-title>
        <v-card-text>
          <RateLimitBar />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="refresh">Refresh</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RateLimitBar from '@/components/RateLimitBar.vue'
import { useRateLimitStore } from '@/stores/useRateLimitStore'

const showStats = ref(false)
const { checkRateLimit } = useRateLimitStore()

function refresh() {
  checkRateLimit()
}
</script>
