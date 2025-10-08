<template>
  <v-footer
    absolute
    app
    class="justify-end pa-2"
    role="contentinfo"
    aria-label="Application footer with GitHub API statistics"
  >
    <RateLimitPopup />
  </v-footer>
</template>

<script setup lang="ts">
import RateLimitPopup from './RateLimitPopup.vue'
</script>
