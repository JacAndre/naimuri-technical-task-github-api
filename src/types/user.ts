export interface User {
  name: string
  html_url: string
  avatar_url: string
  bio?: string | undefined
  location?: string | undefined
  followers?: number | undefined
  following?: number | undefined
}
