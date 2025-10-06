import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchReadme, fetchReposByUser, fetchUserInfo } from '@/services/githubService'
import type { Repo } from '@/types/repo'
import type { User } from '@/types/user'

export const useRepoStore = defineStore('repo', () => {
  const username = ref<string>('')
  const repos = ref<Repo[]>([])
  const selectedRepo = ref<Repo | null>(null)
  const user = ref<User | null>(null)

  const readme = ref<string>('')
  const loading = ref<boolean>(false)

  const repoJson = computed(() => repos.value)
  const currentUsername = computed(() => username.value)

  async function loadUserInfo(presetUser: string): Promise<void> {
    loading.value = true
    user.value = await fetchUserInfo(presetUser)
    loading.value = false
  }

  async function loadRepos(presetUser: string): Promise<void> {
    username.value = presetUser
    loading.value = true
    repos.value = await fetchReposByUser(presetUser)
    loading.value = false
  }

  async function loadReadme(repo: Repo) {
    loading.value = true
    selectedRepo.value = repo
    readme.value = await fetchReadme(repo.owner.login, repo.name)
    loading.value = false
  }

  return {
    username,
    repos,
    user,
    loading,
    readme,
    repoJson,
    currentUsername,
    loadUserInfo,
    loadRepos,
    loadReadme,
  }
})
