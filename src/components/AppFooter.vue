<template>
  <v-footer absolute app>
    <v-spacer />

    <v-tooltip text="GitHub Api Stats">
      <template v-slot:activator="{ props: tooltipProps }">
        <v-menu v-model="showStats" location="top" offset="8" transition="scale-transition">
          <template #activator="{ props: menuProps }">
            <v-btn icon v-bind="{ ...tooltipProps, ...menuProps }">
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
          </v-card>
        </v-menu>
      </template>
    </v-tooltip>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RateLimitBar from './RateLimitBar.vue'

const showStats = ref(false)
</script>
