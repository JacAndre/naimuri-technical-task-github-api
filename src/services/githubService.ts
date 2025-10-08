import type { Rate, RateLimit } from '@/types/rateLimit'
import type { Repo } from '@/types/repo'
import type { SuggestedUser } from '@/types/suggestedUser'
import type { User } from '@/types/user'
import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})

export const fetchUserSuggestions = async (query: string): Promise<SuggestedUser[]> => {
  try {
    const response = await github.get<{ items: SuggestedUser[] }>('/search/users', {
      params: { q: query },
    })
    return response.data.items.map((user) => ({
      login: user.login,
      avatar_url: user.avatar_url,
    }))
  } catch {
    return []
  }
}

export const fetchUserInfo = async (username: string): Promise<User> => {
  try {
    const response = await github.get<User>(`/users/${username}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user info')
    }
    throw new Error('Unexpected error occurred')
  }
}

export const fetchReposByUser = async (username: string): Promise<Repo[]> => {
  try {
    const response = await github.get<Repo[]>(`/users/${username}/repos`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('No User Information found for: ' + username)
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch repositories')
    }
    throw new Error('Unexpected error occurred')
  }
}

export const fetchReadme = async (owner: string, repo: string): Promise<string> => {
  try {
    const response = await github.get<string>(`/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return 'README not found for this repository.'
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch README')
    }
    throw new Error('Unexpected error occurred')
  }
}

export const fetchRateLimit = async (): Promise<Rate> => {
  const response = await github.get<RateLimit>(`/rate_limit`)
  if (response.data?.rate.remaining === 0) {
    throw new Error('GitHub API rate limit exceeded. Please wait until reset.')
  }
  return response.data?.rate
}
