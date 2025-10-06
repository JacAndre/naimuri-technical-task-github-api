import type { Owner } from './owner'

export interface Repo {
  id: number
  name: string
  owner: Owner
  html_url: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
}
