<template>
  <div ref="tableContainer">
    <v-data-table
      :items="repoStore.repos"
      :headers="headers"
      :loading="repoStore.loadingRepos"
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
            <v-btn size="small" @click="openReadme(item)"> View README </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="showDialog" max-width="900">
      <v-card>
        <v-card-title class="text-h6"> {{ selectedRepo?.name }} README </v-card-title>
        <v-card-text>
          <ReadmeViewer :content="repoStore.readme" :loading="repoStore.loadingReadme" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRepoStore } from '@/stores/useRepoStore'
import { ref } from 'vue'
import ReadmeViewer from './ReadmeViewer.vue'
import type { DataTableHeader } from 'vuetify'
import type { Repo } from '@/types/repo'

const repoStore = useRepoStore()
const selectedRepo = ref<Repo | null>(null)
const showDialog = ref(false)

const headers: DataTableHeader[] = [
  { title: 'Name', key: 'name', sortable: true, width: '30%' },
  { title: 'Language', key: 'language', sortable: true },
  { title: 'Stars', key: 'stargazers_count', sortable: true },
  { title: 'Forks', key: 'forks_count', sortable: true },
  { title: 'Issues', key: 'open_issues_count', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

function openReadme(repo: Repo) {
  selectedRepo.value = repo
  repoStore.loadReadme(repo)
  showDialog.value = true
}
</script>

<style scoped></style>
