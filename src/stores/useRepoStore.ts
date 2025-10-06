import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchReadme, fetchReposByUser } from '@/services/githubService'
import type { Repo } from '@/types/repo'

export const useRepoStore = defineStore('repo', () => {
  const username = ref<string>('')
  const repos = ref<Repo[]>([])
  const loading = ref<boolean>(false)
  const readme = ref<string>('')

  const repoJson = computed(() => repos.value)
  const currentUsername = computed(() => username.value)

  async function loadRepos(presetUser: string): Promise<void> {
    username.value = presetUser
    loading.value = true
    repos.value = await fetchReposByUser(presetUser)
    loading.value = false
    loadReadme(presetUser, repos.value[repos.value.length - 2]?.name || '')
  }

  async function loadReadme(owner: string, repo: string): Promise<void> {
    loading.value = true
    readme.value = await fetchReadme(owner, repo)
    loading.value = false
  }

  return {
    username,
    repos,
    loading,
    readme,
    repoJson,
    currentUsername,
    loadRepos,
  }
})
