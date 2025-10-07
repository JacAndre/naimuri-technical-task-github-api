import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchReadme, fetchReposByUser, fetchUserInfo } from '@/services/githubService'
import type { Repo } from '@/types/repo'
import type { User } from '@/types/user'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

export const useRepoStore = defineStore('repo', () => {
  const username = ref<string>('')
  const repos = ref<Repo[]>([])
  const selectedRepo = ref<Repo | null>(null)
  const user = ref<User | null>(null)

  const snackbar = ref(false)
  const snackbarMessage = ref('')

  const readme = ref<string>('')
  const loadingRepos = ref<boolean>(false)
  const loadingReadme = ref<boolean>(false)

  const repoJson = computed(() => repos.value)
  const currentUsername = computed(() => username.value)

  async function loadUserInfo(presetUser: string): Promise<void> {
    loadingRepos.value = true
    try {
      user.value = await fetchUserInfo(presetUser)
    } catch (error: unknown) {
      showError(extractErrorMessage(error))
      user.value = null
    } finally {
      loadingRepos.value = false
    }
  }

  async function loadRepos(presetUser: string): Promise<void> {
    username.value = presetUser
    loadingRepos.value = true
    try {
      repos.value = await fetchReposByUser(presetUser)
    } catch (error: unknown) {
      showError(extractErrorMessage(error))
      repos.value = []
    } finally {
      loadingRepos.value = false
    }
  }

  async function loadReadme(repo: Repo) {
    loadingReadme.value = true
    selectedRepo.value = repo
    readme.value = ''
    try {
      const content = await fetchReadme(repo.owner.login, repo.name)
      if (selectedRepo.value?.id === repo.id) {
        readme.value = content
      }
    } catch (error: unknown) {
      showError(extractErrorMessage(error))
    } finally {
      loadingReadme.value = false
    }
  }

  function showError(message: string) {
    snackbarMessage.value = message
    snackbar.value = true
  }

  return {
    username,
    repos,
    user,
    loadingRepos,
    loadingReadme,
    snackbar,
    snackbarMessage,
    readme,
    repoJson,
    currentUsername,
    loadUserInfo,
    loadRepos,
    loadReadme,
    showError,
  }
})
