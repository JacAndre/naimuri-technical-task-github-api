<template>
  <v-sheet elevation="1" class="pa-4" style="max-height: 600px; overflow-y: auto; overflow-x: auto">
    <v-btn
      icon
      size="small"
      class="position-absolute"
      style="top: 16px; right: 16px; z-index: 1"
      @click="copyContent"
    >
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <v-progress-linear v-if="loading" indeterminate color="primary" height="4" />
    <div v-else class="markdown-body" v-html="renderedMarkdown" />
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
  loading?: boolean
}>()

const renderedMarkdown = computed(() => marked.parse(props.content || ''))

function copyContent() {
  navigator.clipboard
    .writeText(props.content)
    .then(() => {
      console.log('README copied to clipboard')
    })
    .catch((err) => {
      console.error('Copy failed:', err)
    })
}
</script>
