<template>
  <v-sheet elevation="1" class="pa-4" style="max-height: 60vh; overflow-y: auto; overflow-x: auto">
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
</script>
