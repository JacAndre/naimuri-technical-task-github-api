<template>
  <div ref="tableContainer" role="region" aria-label="GitHub repositories table">
    <v-data-table
      :items="repoStore.repos"
      :headers="headers"
      :loading="repoStore.loadingRepos"
      item-value="id"
      class="elevation-1 mt-4"
      striped="even"
      aria-label="List of GitHub repositories"
      role="table"
    >
      <template #item="{ item }">
        <tr role="row">
          <td role="cell">
            <a
              :href="item.html_url"
              target="_blank"
              :aria-label="`Open ${item.name} repository on GitHub`"
            >
              {{ item.name }}
            </a>
          </td>
          <td role="cell" :aria-label="`Language: ${item.language}`">
            {{ item.language }}
          </td>
          <td role="cell" style="text-align: center" :aria-label="`${item.stargazers_count} stars`">
            {{ item.stargazers_count }}
          </td>
          <td role="cell" style="text-align: center" :aria-label="`${item.forks_count} forks`">
            {{ item.forks_count }}
          </td>
          <td
            role="cell"
            style="text-align: center"
            :aria-label="`${item.open_issues_count} open issues`"
          >
            {{ item.open_issues_count }}
          </td>
          <td role="cell">
            <v-btn
              size="small"
              elevation="1"
              variant="text"
              @click="openReadme(item)"
              :aria-label="`View README for ${item.name}`"
            >
              View README
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog
      v-model="showDialog"
      max-width="900"
      role="dialog"
      :aria-label="`README for ${selectedRepo?.name}`"
    >
      <v-card class="pa-4" role="document">
        <a
          :href="selectedRepo?.html_url"
          target="_blank"
          :aria-label="`Open ${selectedRepo?.name} repository on GitHub`"
        >
          <v-card-title
            class="readme-title text-h5 text-decoration-underline"
            role="heading"
            aria-level="2"
          >
            {{ selectedRepo?.name }} README
          </v-card-title>
        </a>
        <v-card-text class="pa-0">
          <ReadmeViewer
            :content="repoStore.readme"
            :loading="repoStore.loadingReadme"
            aria-label="Repository README content"
          />
        </v-card-text>
        <v-card-actions class="readme-actions">
          <v-spacer />
          <v-btn elevation="1" @click="showDialog = false" aria-label="Close README dialog">
            Close
          </v-btn>
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
  { title: 'Stars', key: 'stargazers_count', align: 'center', sortable: true },
  { title: 'Forks', key: 'forks_count', align: 'center', sortable: true },
  { title: 'Issues', key: 'open_issues_count', align: 'center', sortable: true },
  { title: '', key: 'actions', sortable: false },
]

function openReadme(repo: Repo) {
  selectedRepo.value = repo
  repoStore.loadReadme(repo)
  showDialog.value = true
}
</script>

<style>
.v-data-table-header__sort-icon {
  opacity: 0.3 !important;
  margin-left: 2px;
}

.readme-title {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 16px !important;
}

.readme-actions {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 16px !important;
  padding-bottom: 0px !important;
}
</style>
