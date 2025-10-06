import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
})

export const fetchUserInfo = async (username: string) => {
  const response = await github.get(`/users/${username}`)
  return response.data
}

export const fetchReposByUser = async (username: string) => {
  const response = await github.get(`/users/${username}/repos`)
  return response.data
}

export const fetchReadme = async (owner: string, repo: string) => {
  const response = await github.get(`/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github.v3.raw' },
  })
  return response.data
}
