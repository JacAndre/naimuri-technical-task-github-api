<template>
  <v-sheet
    elevation="1"
    class="pa-4"
    style="max-height: 600px; overflow-y: auto; overflow-x: auto"
    role="region"
    aria-label="Rendered README content"
  >
    <v-btn
      icon
      size="small"
      class="position-absolute"
      style="top: 16px; right: 16px; z-index: 1"
      @click="copyContent"
      aria-label="Copy README content to clipboard"
    >
      <v-icon aria-hidden="true">mdi-content-copy</v-icon>
    </v-btn>

    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      height="4"
      aria-label="Loading README content"
      role="progressbar"
    />

    <div
      v-else
      class="markdown-body"
      v-html="renderedMarkdown"
      role="document"
      aria-label="GitHub README rendered in markdown"
    />
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
