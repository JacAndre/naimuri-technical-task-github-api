<template>
  <v-data-table
    :items="repoStore.repos"
    :headers="headers"
    item-value="id"
    class="elevation-1 mt-4"
  >
    <template #item="{ item }">
      <tr>
        <td>
          <a :href="item.html_url" target="_blank">{{ item.name }}</a>
        </td>
        <td>{{ item.language }}</td>
        <td>{{ item.stargazers_count }}</td>
        <td>{{ item.forks_count }}</td>
        <td>{{ item.open_issues_count }}</td>
        <td>
          <v-btn size="small" @click="toggleReadme(item.id)">
            {{ selectedRepoId === item.id ? 'Hide' : 'View' }} README
          </v-btn>
        </td>
      </tr>
      <tr v-if="selectedRepoId === item.id">
        <td colspan="5">
          <v-card class="pa-4" elevation="2">
            <pre>{{ repoStore.readme }}</pre>
          </v-card>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useRepoStore } from '@/stores/useRepoStore'
import { ref } from 'vue'
import type { DataTableHeader } from 'vuetify'

const repoStore = useRepoStore()
const selectedRepoId = ref<number | null>(null)

const headers: DataTableHeader[] = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Language', key: 'language', sortable: true },
  { title: 'Stars', key: 'stargazers_count', sortable: true },
  { title: 'Forks', key: 'forks_count', sortable: true },
  { title: 'Issues', key: 'open_issues_count', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

function toggleReadme(repoId: number) {
  selectedRepoId.value = selectedRepoId.value === repoId ? null : repoId
  const repo = repoStore.repos.find((r) => r.id === repoId)
  if (repo) {
    repoStore.loadReadme(repo)
  }
}
</script>

<style scoped></style>
