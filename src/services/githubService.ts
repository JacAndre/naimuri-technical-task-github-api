import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})

export const fetchUserInfo = async (username: string) => {
  try {
    const response = await github.get(`/users/${username}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user info')
    }
    throw new Error('Unexpected error occurred')
  }
}

export const fetchReposByUser = async (username: string) => {
  try {
    const response = await github.get(`/users/${username}/repos`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repositories')
    }
    throw new Error('Unexpected error occurred')
  }
}

export const fetchReadme = async (owner: string, repo: string) => {
  try {
    const response = await github.get(`/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 404) {
        return 'README not found for this repository.'
      }
      throw new Error(error?.response?.data?.message || 'Failed to fetch README')
    }
    throw new Error('Unexpected error occurred')
  }
}
